package com.example.ecommerceapp.repository;

import com.example.ecommerceapp.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {
    @Query("select t from Token t inner join t.user u where t.user.id = :userId and t.loggedOut = false")
    List<Token> findAllTokensByUser(@Param("userId") long userId);

    Optional<Token> findByToken(String token);

}
