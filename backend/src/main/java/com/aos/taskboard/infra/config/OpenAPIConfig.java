package com.aos.taskboard.infra.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenAPIConfig {

  private SecurityScheme createAPIKeyScheme() {
    return new SecurityScheme().name("jwt_auth").type(SecurityScheme.Type.HTTP)
        .bearerFormat("JWT")
        .scheme("bearer");
  }

  @Bean
  public OpenAPI myOpenAPI() {
    Server devServer = new Server();
    devServer.setUrl("/");
    devServer.setDescription("Server URL in Development environment");

    Server prodServer = new Server();
    prodServer.setUrl("/");
    prodServer.setDescription("Server URL in Production environment");

    Contact contact = new Contact();
    contact.setEmail("taskboard@noreply.com");
    contact.setName("Task Board");
    contact.setUrl("https://www.taskboard.com");

    License mitLicense = new License().name("MIT License").url("https://choosealicense.com/licenses/mit/");

    Info info = new Info()
        .title("Task Board - API")
        .version("1.0")
        .contact(contact)
        .description("This API exposes endpoints to manage tutorials.")
        .termsOfService("https://www.meusite.com/terms")
        .license(mitLicense);

    return new OpenAPI()
        .schemaRequirement("jwt_auth", createAPIKeyScheme())
        .info(info).servers(List.of(devServer, prodServer));
  }
}
