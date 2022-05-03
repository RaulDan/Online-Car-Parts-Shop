package com.example.Online.Shop.Service.Implem;

import com.example.Online.Shop.Actori.Client;
import com.example.Online.Shop.DTO.*;
import com.example.Online.Shop.Exceptii.ApiExceptionResponse;
import com.example.Online.Shop.Model.Logari;
import com.example.Online.Shop.Model.Produs;
import com.example.Online.Shop.Model.Review;
import com.example.Online.Shop.Repositories.ClientRepository;
import com.example.Online.Shop.Repositories.ProdusRepository;
import com.example.Online.Shop.Repositories.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements com.example.Online.Shop.Service.ClientService {

    private final ClientRepository clientRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final ProdusRepository produsRepository;
    private final ReviewRepository reviewRepository;



    @Override
    @Transactional
    public Client save(RegisterClientDTO registerClientDTO) {//Salvez un client nou inregistrat


        String nume=registerClientDTO.getUsername();
        String parola= registerClientDTO.getPassword();
        parola=encoder().encode(parola);
        String mail=registerClientDTO.getEmail();
        String noTelefon= registerClientDTO.getTelephone();
        // Client c=new Client(null,nume,parola,mail,noTelefon);
        String data = new SimpleDateFormat("dd-MM-yyyy 'at' HH:mm:ss").format(new Date());

        //Salvez pentru clientul care isi face un cont data la care s-a conectat
        Logari logari=Logari.builder().dataLogin(data).build();
        List<Logari> logs=new ArrayList<>();
        //logs.add(logari);
        Client c=Client.builder().nume(nume).email(mail).id(null).numarTelefon(noTelefon).istoricLogari(logs).parola(parola).build();
        c.getIstoricLogari().add(logari);

        return clientRepository.save(c);
    }

    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }


    @Override
    @Transactional
    public Client logare(LogareDTO dto) throws ApiExceptionResponse
    {
        Client c=clientRepository.findFirstByNume(dto.getUsername());
        if(encoder().matches(c.getParola(),dto.getPassword()))
        {
            String data = new SimpleDateFormat("dd-MM-yyyy 'at' HH:mm:ss").format(new Date());

            //Salvez pentru clientul care isi face un cont data la care s-a conectat
            Logari logari=Logari.builder().dataLogin(data).build();
            c.getIstoricLogari().add(logari);
            clientRepository.save(c);
            return c;
        }
        //Client c=clientRepository.findFirstByNumeAndParola(dto.getUsername(),dto.getPassword());
        if(c==null)
        {
            throw ApiExceptionResponse.builder().errors(Collections.singletonList("Bad credentials"))
                    .message("User not found").status(HttpStatus.NOT_FOUND).build();
        }
//        String data = new SimpleDateFormat("dd-MM-yyyy 'at' HH:mm:ss").format(new Date());
//
//        //Salvez pentru clientul care isi face un cont data la care s-a conectat
//        Logari logari=Logari.builder().dataLogin(data).build();
//        c.getIstoricLogari().add(logari);

        return c;
    }

    @Override
    public List<Client> findAll() {

        return  clientRepository.findAll();
    }

    @Override
    @Transactional
    public Client modifica(Long id, ModificareClientDTO dto,String mesaj,String data) {

        Client c=clientRepository.findFirstById(id);
        if(!(dto.getNume().equals(null)))
        {
            c.setNume(dto.getNume());
        }
        if(!(dto.getParola().equals(null))){
            c.setParola(dto.getParola());
        }
        if(!(dto.getEmail().equals(null))){
            c.setEmail(dto.getEmail());
        }

        if(!(dto.getNumarTelefon().equals(null))){
            c.setNumarTelefon(dto.getNumarTelefon());
           // Client cc=clientRepository.findFirstById(66L);

        }


        mesaj+="Noile credentiale sunt:\nNume:"+c.getNume()+"\nParola:"+c.getParola()+"\nEmail:"+c.getEmail()+"\nNumarTelefon:"+c.getNumarTelefon()+"\n";
        mesaj+="Data modicarii este:\n"+data+"\n";

        //messagingTemplate.convertAndSend("/topic/socket/admin","Vreau sa comhhhgand ");
        messagingTemplate.convertAndSend("/topic/socket/notificari",mesaj);

        return c;

    }

    @Override
    public String review(ReviewDTO dto) {

        String data = new SimpleDateFormat("dd-MM-yyyy 'at' HH:mm:ss").format(new Date());

        Produs p=produsRepository.findFirstById(dto.getId());
        Review review=Review.builder().utilizator(dto.getNumeClient()).data(data).review(dto.getReview()).build();
        p.getReviews().add(review);
        reviewRepository.save(review);

        return "ok";
    }

    @Override
    public List<Review> findAllReviews(Long id) {

        Produs p=produsRepository.findFirstById(id);
        return p.getReviews();
    }

    @Override
    public Client findFirstByID(Long id) {
        return  clientRepository.findFirstById(id);
    }

    @Override
    public List<Logari> logari(Long id) {

        Client client=clientRepository.findFirstById(id);
        return  client.getIstoricLogari();
    }

    @Override
    public String abuz(Long id, String text) {
        Client client=clientRepository.findFirstById(id);
        String mesaj="Abuz raportat de "+client.getNume();
        mesaj=mesaj+"\nTextul abuzului este:"+text;

        messagingTemplate.convertAndSend("/topic/socket/notificari",mesaj);
        return mesaj;
    }


}
