---
title: What is Dependency Injection?
description: A brief overview of Dependency Injection and its benefits.
date: "2024-04-09"
hidden: false
---

# What is Dependency Injection?

Dependency Injection (DI) is a design pattern used in Object-Oriented Programming that allows a class to receive its dependencies from an external source rather than creating them itself.

## Why Use Dependency Injection?

Dependency Injection is used to achieve **Inversion of Control** (IoC), which is a principle that helps to decouple the components. This decoupling makes the code more flexible, easier to test and maintain. By using DI, we can change the implementation of a dependency without changing the class that uses it.

We will take a look at the benefits of DI later in this article. First, let's look at an example of code that does not use Dependency Injection and then we will refactor it to use DI.

## Example of Code Without Dependency Injection

Think of a senario where an order is placed, `OrderService` needs to interact with `InventoryService`, `ShippingService` and `PaymentService`. In this case, `OrderService` is tightly coupled with these services. Here is an example of how this might look:

```java
class OderService {
    private InventoryService inventoryService;
    private ShippingSerive shippingService;
    private PaymentService paymentService;

    public OrderService() {
        this.inventoryService = new InventoryService();
        this.shippingService = new ShippingService();
        this.paymentService = new PaymentService();
    }

    void placeOrder(Order order) {
        inventoryService.checkInventory(order);
        shippingService.shipOrder(order);
        paymentService.processPayment(order);
    }
}
```

```java
class InventoryService {
    void checkInventory(Order order) {
        // Check inventory logic
    }
}

class ShippingService {
    void shipOrder(Order order) {
        // Ship order logic
    }
}

class PaymentService {
    void processPayment(Order order) {
        // Process payment logic
    }
}
```

```java
class Order {
    // Order properties
}
```

```java
class Main {
    public static void main(String[] args) {
        Order order = new Order();
        OrderService orderService = new OrderService();
        orderService.placeOrder(order);
    }
}
```