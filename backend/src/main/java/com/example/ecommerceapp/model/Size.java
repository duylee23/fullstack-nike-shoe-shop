package com.example.ecommerceapp.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "size")
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private double sizeNumber;
    @JsonIgnore
    @ManyToMany(mappedBy = "sizes")
    private Set<Product> products = new HashSet<>();
}
