package com.example.ecommerceapp.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

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
    private List<Product> products;
}
