package com.example.ecommerceapp.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cart_detail")
@Getter
@Setter
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long quantity;
    private double price;
    private String size;

    //cart_id
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    //product_id
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
