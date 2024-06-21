package com.example.ecommerceapp.util;

import com.example.ecommerceapp.entity.Product;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {
    public static Specification<Product> hasName(String name) {
        return (Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if(name == null || name.isEmpty()){
                return cb.conjunction();
            }
            return cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
        };
    }

    public static Specification<Product> hasCategory(String category){
        return (Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if(category == null || category.isEmpty()) {
                return cb.conjunction();
            }
            return cb.like(cb.lower(root.get("category")), "%" + category.toLowerCase() + "%");
        };
    }

    public static Specification<Product> sortByPrice(String sortDirection) {
        return (Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Order order;
            if ("desc".equalsIgnoreCase(sortDirection)) {
                query.orderBy(cb.desc(root.get("price")));
            } else if ("asc".equalsIgnoreCase(sortDirection)) {
                query.orderBy(cb.asc(root.get("price")));
            };
            return cb.conjunction();
        };
    }

    public static Specification<Product> hasSize(Long size) {
        return (Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if(size == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("sizes").get("sizeNumber"), size);
        };
    }

    public static Specification<Product> hasPriceBetween(Double minPrice, Double maxPrice) {
        return (Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (minPrice == null && maxPrice == null) {
                return cb.conjunction();
            }
            if (minPrice != null && maxPrice != null) {
                return cb.between(root.get("price"), minPrice, maxPrice);
            }
            if (minPrice != null) {
                return cb.greaterThanOrEqualTo(root.get("price"), minPrice);
            }
            return cb.lessThanOrEqualTo(root.get("price"), maxPrice);
        };
    }

}
