package com.example.ecommerceapp.repository;


import com.example.ecommerceapp.entity.Cart;
import com.example.ecommerceapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUser(User user);
}
