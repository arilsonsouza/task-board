package com.aos.taskboard.infra.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.aos.taskboard.domain.user.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

@Service
public class JwtTokenService {
  @Value("${taskboard.app.jwt_secret}")
  private String jwtSecret;

  @Value("${taskboard.app.jwt_issuer}")
  private String jwtIssuer;

  @Value("${taskboard.app.jwt_expiration_in_minutes}")
  private Integer jwtExpirationInMinutes;

  public String generateToken(User user) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
      String token = JWT.create()
          .withIssuer(jwtIssuer)
          .withSubject(user.getEmail())
          .withIssuedAt(Date.from(Instant.now()))
          .withExpiresAt(genExpirationDate())
          .sign(algorithm);
      return token;
    } catch (JWTCreationException exception) {
      throw new RuntimeException("Error while generating token", exception);
    }
  }

  public String validateToken(String token) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
      return JWT.require(algorithm)
          .withIssuer(jwtIssuer)
          .build()
          .verify(token)
          .getSubject();
    } catch (JWTVerificationException exception) {
      return null;
    }
  }

  private Instant genExpirationDate() {
    return LocalDateTime.now().plusMinutes(jwtExpirationInMinutes).toInstant(ZoneOffset.of("-03:00"));
  }
}
