package com.example.ecommerceapp.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Entity
@Table (name = "carts")
@Getter
@Setter
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //user_id
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    //cart_detail_id
    @JsonIgnore
    @OneToMany(mappedBy = "cart")
    List<CartDetail> cartDetailList;


}
