package com.example.ecommerceapp.repository;


import com.example.ecommerceapp.entity.Cart;
import com.example.ecommerceapp.entity.Order;
import com.example.ecommerceapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByUser(User user);
}
