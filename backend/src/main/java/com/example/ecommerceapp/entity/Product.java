package com.example.ecommerceapp.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private double price;
    private String image;
    private String category;
    private String description;
    private long quantity;
    private long sold;

    @ManyToMany
    @JoinTable(
            name="product_size",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "size_id")
    )
    private List<Size> sizes;


    @JsonIgnore
    @OneToMany(mappedBy = "product")
    List<OrderDetail> orderDetails;


    @JsonIgnore
    @OneToMany(mappedBy = "product" , cascade = CascadeType.ALL, orphanRemoval = true)
    List<CartDetail> cartDetails;
}
