package com.example.Online.Shop.Service.Implem;

import com.example.Online.Shop.Actori.Admin;
import com.example.Online.Shop.Actori.Client;
import com.example.Online.Shop.DTO.*;
import com.example.Online.Shop.Exceptii.ApiExceptionResponse;
import com.example.Online.Shop.Link.Comanda;
import com.example.Online.Shop.Model.Notificare;
import com.example.Online.Shop.Model.Produs;
import com.example.Online.Shop.Repositories.*;
import com.example.Online.Shop.Service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import java.io.StringWriter;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.*;


@Service
@RequiredArgsConstructor

public class AdminServiceImpl implements AdminService {

    private final ClientRepository clientRepository;
    private final ComandaRepository comandaRepository;
    private final AdminRepository adminRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final ClientServiceImpl clientServiceImpl;
    private final NotificareRepository notificareRepository;


    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    //Metoda prin care trimit un mail de confirmare creare cont
    @Override
    public String sendMail(RegisterClientDTO registerClientDTO) {

        String username = "rauldan216@gmail.com";
        String pass="elvira100";
        Client client=clientRepository.findFirstByNume(registerClientDTO.getUsername());
        //Daca vreau sa inregistrez un client cu nume existent, atunci
        //se va returna faptul ca exista acel client
        if(client!=null){
            return "gasit";
        }

        clientServiceImpl.save(registerClientDTO);

        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");

        String finalUsername = username;
        String finalPassword= "elvira100";
        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username,pass);
            }
        });

        MimeMessage mimeMessage = new MimeMessage(session);

        String message = "Inregistrarea a fost realizata cu succes!" +
                "\n Username-ul dumneavoastra este "+registerClientDTO.getUsername()+"" +
                "\n Parola dumneavoastra este "+registerClientDTO.getPassword();

        try {
            mimeMessage.setFrom(new InternetAddress(username));
            mimeMessage.addRecipient(Message.RecipientType.TO,new InternetAddress(registerClientDTO.getEmail()));
            mimeMessage.setSubject("Register");
            mimeMessage.setText(message);

            Transport.send(mimeMessage);


        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return "OK";
    }

    public String export_data(Object o) throws JAXBException {
        String export="";
        JAXBContext jaxbContext=JAXBContext.newInstance(o.getClass());
        Marshaller marshaller=jaxbContext.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT,true);
        StringWriter stringWriter=new StringWriter();
        marshaller.marshal(o,stringWriter);
        export=stringWriter.toString();
        return export;
    }

    @Override
    //Metoda prin care procesez comanda data de un utilizator
    public String procesareComanda(List<ProdusDTO> produsDTOList, Long id) {



        Client client=clientRepository.findFirstById(id);
        //Generare Data Curenta
        String data = new SimpleDateFormat("dd-MM-yyyy 'at' HH:mm:ss").format(new Date());




        //Mesajul care se transmite prin Websocket(Notificarea trimisa catre administrator)
        String comanda="Inregistrare Comnada.\nComanda a fost realizata de:"+client.getNume()+" \nData efectuarii comenzii:\n"+data+"\n";
        comanda+="Produsele comandata sunt:\n";
        for(ProdusDTO p:produsDTOList)
        {
            comanda+=p.getDescriere()+" "+p.getPret()+"\n";
        }

        //Convertesc lista de DTO in produse
        List<Produs> produses=new ArrayList<>();
        for(ProdusDTO p:produsDTOList){
            p.setCantitate(p.getCantitate()-1);
            Produs p1= Produs.builder().pret(p.getPret()).nume(p.getNume()).descriere(p.getDescriere()).cantitate(p.getCantitate()).id(p.getId()).build();
            produses.add(p1);
        }

        //Generare String (Cod Aleator)
        byte[] array = new byte[8]; // length is bounded by 7
        new Random().nextBytes(array);
        String generatedString = new String(array, Charset.forName("UTF-8"));

        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 8) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        generatedString = salt.toString();




        //Calculez pretul pentru toate produsele comandata
        Double pret=calculPret(produses);

        //Proceez comanda si o salvez in baza de date
        Comanda c1=Comanda.builder().data(data).cod(generatedString).id(null).cantitate((long) produses.size()).produse(produses).pret(pret).client(client).build();
        c1.setData(data);
        comandaRepository.save(c1);

        //Mesajul care se transmite prin Websocket(Notificarea trimisa catre administrator)
        comanda+="Suma totala este:"+c1.getPret()+"\n";
        //Trimitere WebSocket
        messagingTemplate.convertAndSend("/topic/socket/notificari",comanda);
        Notificare notificare=Notificare.builder().notificare(comanda).build();
        notificareRepository.save(notificare);
        //Datele celui care trimite mail
        String username = "rauldan216@gmail.com";
        String pass="elvira100";

        //Properties pentru a trimite mesajul
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");

        //Sesiune pentru a trimite un mesaj
        //Setez numele si parola celui care trimite mail
        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username,pass);
            }
        });

        MimeMessage mimeMessage = new MimeMessage(session);

        //Mesajul care se transmite utilizatorului
        String message = "Comanda dumneavoatra este: ";
        String prod = "\n";
        for(Produs p:c1.getProduse()){

            prod=prod+p.getDescriere()+" : "+p.getPret()+"\n";

        }
        String sum="Suma totala este: "+c1.getPret()+"\n";
        String mesajFinal=message+prod+sum+"\n"+"Data comenzii este:"+data+"\n"+"Codul Comenziii este: "+generatedString;



        //Trimiterea mesajului
        try {
            mimeMessage.setFrom(new InternetAddress(username));
            mimeMessage.addRecipient(Message.RecipientType.TO,new InternetAddress(client.getEmail()));
            mimeMessage.setSubject("Realizare Comanda Reusita");
            mimeMessage.setText(mesajFinal);
            //Transmiterea efectiva a mesajului
            Transport.send(mimeMessage);


        } catch (MessagingException e) {
            e.printStackTrace();
        }

        //Convertire si Trimitere XML
        String xml="";
        try {
            xml=export_data(c1);
        } catch (JAXBException e) {
            e.printStackTrace();
        }
        return xml;






    }

    //Metoda prin care trimit prin mail codul random generat pentru a schimba parola
    @Override
    public SchimbareParolaDTO trimitereMailCodParola(String numeClient) throws ApiExceptionResponse
    {

        //Numele si parola celui care trimite mail-ul catre client
        String username = "rauldan216@gmail.com";
        String pass="elvira100";

        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username,pass);
            }
        });

        MimeMessage mimeMessage = new MimeMessage(session);
        //Codul pe care utilizatorul il primeste pentru a reseta parola
        int random_int = (int)(Math.random() * (9999 - 1000 + 1) + 1000);
        //Mesajul care se trimite, impreuna cu codul pentru schimbarea parolei
        String message = "Codul pentru dumneavoatra "+numeClient+" pentru resetarea parolei este: "+random_int+"\n";
        Client client=clientRepository.findFirstByNume(numeClient);
        if(client==null)
        {
            throw ApiExceptionResponse.builder().errors(Collections.singletonList("Bad credentials"))
                    .message("User not found").status(HttpStatus.NOT_FOUND).build();
        }

        try {
            mimeMessage.setFrom(new InternetAddress(username));
            mimeMessage.addRecipient(Message.RecipientType.TO,new InternetAddress(client.getEmail()));
            mimeMessage.setSubject("Schimbare Parola");
            mimeMessage.setText(message);

            Transport.send(mimeMessage);


        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return SchimbareParolaDTO.builder().nume(numeClient).cod(random_int).build();
    }


    @Override
    @Transactional
    //Metoda prin care efectiv modific parola unui client
    public Client schimbareParola(SchimbareParolaDTO dto) {//Modifcam parola clientului


        Client c=clientRepository.findFirstByNume(dto.getNume());
        c.setParola(dto.getParola());


        String username = "rauldan216@gmail.com";
        String pass="elvira100";

        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username,pass);
            }
        });

        MimeMessage mimeMessage = new MimeMessage(session);

        //Textul mesajului
        String message = "Parola dumneavoatra noua "+dto.getNume()+"este: "+dto.getParola()+"\n";

        //Trimiterea efectiva a mesajului
        try {
            mimeMessage.setFrom(new InternetAddress(username));
            mimeMessage.addRecipient(Message.RecipientType.TO,new InternetAddress(c.getEmail()));//client.getEmail()
            mimeMessage.setSubject("Schimbare Parola Reusita");
            mimeMessage.setText(message);

            Transport.send(mimeMessage);


        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return c;


    }

    @Override
    public String login(LogareDTO dto) {

        Admin admin= adminRepository.findFirstByNume(dto.getUsername());
        if(admin.getParola().equals(dto.getPassword())){
            return "ok";
        }

        return "bad";
    }

    @Override
    public String mailComanda(Long id, DataDTO dto) {

        Client c1=clientRepository.findFirstById(id);
        String username = "rauldan216@gmail.com";
        String pass="elvira100";

        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username,pass);
            }
        });

        MimeMessage mimeMessage = new MimeMessage(session);

        String message = "Comanda dumneavoatra va ajunge azi.";



        //Trimiterea mesajului
        try {
            mimeMessage.setFrom(new InternetAddress(username));
            mimeMessage.addRecipient(Message.RecipientType.TO,new InternetAddress(c1.getEmail()));
            mimeMessage.setSubject("Realizare Comanda Reusita");
            mimeMessage.setText(message);
            //Transmiterea efectiva a mesajului
            Transport.send(mimeMessage);


        } catch (MessagingException e) {
            e.printStackTrace();
        }


        return "ok";
    }


    //Metoda prin care calculez pretul total al comenzii date
    private Double calculPret(List<Produs> produses)
    {
        double sum=0;
        for(Produs p:produses){
            sum+=p.getPret();
        }
        return  sum;
    }
}
