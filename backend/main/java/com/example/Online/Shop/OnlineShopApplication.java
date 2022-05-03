package com.example.Online.Shop;

import com.example.Online.Shop.Actori.Admin;
import com.example.Online.Shop.Actori.Client;
import com.example.Online.Shop.Model.Marca;

import com.example.Online.Shop.Model.Model;
import com.example.Online.Shop.Model.Produs;
import com.example.Online.Shop.Repositories.*;
import com.example.Online.Shop.Service.MarcaService;

import com.example.Online.Shop.Service.ModelService;
import com.example.Online.Shop.Service.ProdusService;
import org.dom4j.rule.Mode;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.beans.PropertyDescriptor;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@SpringBootApplication
@EnableJpaRepositories
@EntityScan
@EnableSwagger2
public class OnlineShopApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineShopApplication.class, args);
	}

	@Bean
	CommandLineRunner init(ProdusRepository pr,
						   ProdusService produsService, AdminRepository arr, ClientRepository cr,
						   ModelRepository modelRepository, MarcaRepository marcaRepository,
						   ModelService modelService, MarcaService marcaService){
		return  args->{

			final String pp="Filtru Aer";
			final String a1="Curea alternator";
			final String pf="Placute Frana";
			final String fu="Filtru Ulei";

			List<Produs> listaProduse = new ArrayList<>();
			listaProduse.add(Produs.builder().cantitate(12L).descriere(pp+ " VW Golf 4").pret(45D).nume(pp).build());
			listaProduse.add(Produs.builder().cantitate(14L).descriere(a1+" VW Golf 4").pret(10D).nume(a1).build());
			listaProduse.add(Produs.builder().cantitate(15L).descriere(pf+ " VW Golf 4").pret(54D).nume(pf).build());
			listaProduse.add(Produs.builder().cantitate(20L).descriere(fu+" Golf 4").pret(20D).nume(fu).build());

			List<Model> listadeModele= new ArrayList<>();

			Model m = Model.builder().model("Golf 4").produses(listaProduse).build();
			listadeModele.add(m);




			final  String G5="Golf 5";
			final String G6="Golf 6";
			final String passat="Passat";
			List<Produs> prodGolf5=new ArrayList<>();
			prodGolf5.add(Produs.builder().cantitate(10L).descriere(pp+ " VW Golf 5").pret(100D).nume(pp).build());
			prodGolf5.add(Produs.builder().cantitate(20L).descriere(a1+" VW Golf 5").pret(80D).nume(a1).build());
			prodGolf5.add(Produs.builder().cantitate(14L).descriere(pf+ "VW Golf 5").pret(300D).nume(pf).build());
			prodGolf5.add(Produs.builder().cantitate(16L).descriere(fu+" "+G5).pret(180D).nume(fu).build());


			List<Produs> prodGolf6=new ArrayList<>();
			prodGolf6.add(Produs.builder().cantitate(10L).descriere(pp+ " "+G6).pret(100D).nume(pp).build());
			prodGolf6.add(Produs.builder().cantitate(20L).descriere(a1+" "+G6).pret(80D).nume(a1).build());
			prodGolf6.add(Produs.builder().cantitate(14L).descriere(pf+ " "+G6).pret(300D).nume(pf).build());
			prodGolf6.add(Produs.builder().cantitate(16L).descriere(fu+" "+G6).pret(180D).nume(fu).build());

			List<Produs> Passat=new ArrayList<>();
			Passat.add(Produs.builder().cantitate(10L).descriere(pp+ " "+passat).pret(100D).nume(pp).build());
			Passat.add(Produs.builder().cantitate(20L).descriere(a1+" "+passat).pret(80D).nume(a1).build());
			Passat.add(Produs.builder().cantitate(14L).descriere(pf+ " "+passat).pret(300D).nume(pf).build());
			Passat.add(Produs.builder().cantitate(16L).descriere(fu+" "+passat).pret(180D).nume(fu).build());
			
			Model golf5=Model.builder().model(G5).produses(prodGolf5).build();
			listadeModele.add(golf5);
			Model golf6=Model.builder().model(G6).produses(prodGolf6).build();
			listadeModele.add(golf6);

			Model vwPassat=Model.builder().model(passat).produses(Passat).build();
			listadeModele.add(vwPassat);

			Marca marcaVW = Marca.builder().marca("VW").models(listadeModele).build();

	
			//marcaRepository.save(marcaVW);

			final String meg="Megane";
			final String renault="Renault";
			final String clio="Clio";
			final String capture="Capture";

			List<Produs> prodMegane=new ArrayList<>();
			prodMegane.add(Produs.builder().cantitate(10L).descriere("Radiator "+renault+" "+meg).nume("Radiator").pret(75D).build());
//			Produs p5=new Produs(null,fu,fu+" Renault Megane",75D,6L);
//			Produs p2=new Produs(null,"Placuta Frana","Placute Frana Renault Megane",120D,12L);
//			prodMegane.add(p2);
//			prodMegane.add(p5);

			Model megane=Model.builder().model("Megane").produses(prodMegane).build();


			List<Produs> prodClio=new ArrayList<>();
//			Produs p1=new Produs(null,"Placuta Frana ","Placute Frana Renault Clio",200D,2L);
//			Produs p4=new Produs(null,fu,fu+" Renault Clio",80D,5L);
//			prodClio.add(p1);
//			prodClio.add(p4);
//			prodClio.add(Produs.builder().cantitate(30L).pret(90D).descriere("Alternator "+renault+" "+clio).nume("Alternator").build());
//			Model Clio=Model.builder().model(clio).produses(prodClio).build();
//
//			List<Produs> prodCapture=new ArrayList<>();
//			Produs p3=new Produs(null,"Placute Frana","Placute Frane Renault Capture",220D,10L);
//			Produs p6=new Produs(null,fu,fu+ " Renault Capture",80D,3L);
//			prodCapture.add(Produs.builder().cantitate(8L).descriere("Pompa alimentare "+renault+" "+clio).nume("Pompa alimentare").build());
//
//			Model Capture=Model.builder().model(capture).produses(prodCapture).build();
//
//			List<Model> Ren=new ArrayList<>();
//			Ren.add(Clio);
//			Ren.add(megane);
//			Ren.add(Capture);
//
//			Marca Renault=Marca.builder().marca(renault).models(Ren).build();
//			//marcaRepository.save(Renault);
//
//			List<Produs> prodFcous=new ArrayList<>();
//
//
//			Produs p14=new Produs(null,pf,pf+" Ford Fiesta",120D,6L);
//
//			Produs p15=new Produs(null,pf,pf+" Ford Focus",100D,9L);
//
//
//			Produs p16=new Produs(null,fu,fu+" Ford Fiesta",160D,10L);
//
//
//			Produs p17=new Produs(null,fu,fu+" Ford Focus",170D,9L);
//			prodFcous.add(p15);
//			prodFcous.add(p17);
//
//			List<Produs> prodFiesta=new ArrayList<>();
//			prodFiesta.add(p14);
//			prodFiesta.add(p16);
//
//			Model fiesta=Model.builder().model("Fiesta").produses(prodFiesta).build();
//			Model focus=Model.builder().model("Focus").produses(prodFcous).build();
//			List<Model> fordModels=new ArrayList<>();
//			fordModels.add(focus);
//			fordModels.add(fiesta);
//
//			Marca ford=Marca.builder().marca("Ford").models(fordModels).build();
//			//marcaRepository.save(ford);
//
//			Produs p18=new Produs(null,pf,pf+" Dacia Logan",50D,8L);
//
//
//			Produs p19=new Produs(null,pf,pf+" Dacia Duster",80D,10L);
//
//
//			Produs p20=new Produs(null,fu,fu+" Dacia Logan",120D,19L);
//
//
//			Produs p21=new Produs(null,fu,fu+" Dacia Duster",180D,2L);
//
//			List<Produs> loganProd=new ArrayList<>();
//			loganProd.add(p18);
//			loganProd.add(p20);
//
//			List<Produs> dusterProd=new ArrayList<>();
//			dusterProd.add(p19);
//			dusterProd.add(p21);
//
//			Model duster=Model.builder().model("Duster").produses(dusterProd).build();
//			Model logan= Model.builder().model("Logan").produses(loganProd).build();
//			List<Model> daciaModels=new ArrayList<>();
//			daciaModels.add(duster);
//			daciaModels.add(logan);
//
//			Marca dacia=Marca.builder().marca("Logan").models(daciaModels).build();
//			//marcaRepository.save(dacia);
//
//			List<Model> all=new ArrayList<>();
//			all.addAll(listadeModele);
//			all.addAll(Ren);
//			all.addAll(fordModels);
//			all.addAll(daciaModels);
//
//			Marca universal=Marca.builder().marca("Toate").build();
//			//marcaRepository.save(universal);

			Admin admin=Admin.builder().nume("Calugar Raul").mail("rauldan216@gmail.com").parola("elvira100").build();
			//arr.save(admin);



		};
	}

}
