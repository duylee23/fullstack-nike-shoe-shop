package com.example.ecommerceapp.repository;

import com.example.ecommerceapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User save(User user);
    User findByEmail(String email);
    List<User> findAll();
    User findById(long id); // null
    boolean existsByEmail(String email);
}
