---
title: What is Dependency Injection?
description: A brief overview of Dependency Injection and its benefits.
date: "2024-04-09"
hidden: false
---

## Overview

Dependency Injection (DI) is a design pattern used in Object-Oriented Programming that allows a class to receive its dependencies from an external source rather than creating them itself.

## What is Inversion of Control?

Inversion of Control (IoC) is a broader principle that refers to the reversal of the flow of control in a system. In traditional programming, the main program controls the flow of execution and calls functions or methods as needed. In IoC, the control is inverted, meaning that the framework or container takes control and calls the application code when needed.

## What is Dependency Injection?

Dependency Injection is a specific implementation of the Inversion of Control principle. It allows a class to receive its dependencies from an external source, typically a container or framework, rather than creating them itself. This promotes loose coupling between classes and makes it easier to manage dependencies.

## Example

```java
class OrderService {

    private final InventoryService inventoryService;
    private final PaymentService paymentService;

    OrderService(InventoryService inventoryService, PaymentService paymentService) {
        this.inventoryService = inventoryService;
        this.paymentService = paymentService;
    }

    void placeOrder(Order order) {
        if (inventoryService.isAvailable(order.getProductId())) {
            paymentService.processPayment(order.getAmount());
            inventoryService.updateInventory(order.getProductId());
        } else {
            throw new ProductNotAvailableException("Product not available");
        }
    }
}
```

So what happens here? The `OrderService` class does not create instances of `InventoryService` or `PaymentService`. Instead, it receives them as constructor parameters. This allows for greater flexibility and testability, as different implementations of these services can be injected without modifying the `OrderService` class.

To use the `OrderService`, you would create instances of `InventoryService` and `PaymentService` and pass them to the constructor:

```java
class Main {
    public static void main(String[] args) {
        InventoryService inventoryService = new InventoryService();
        PaymentService paymentService = new PaymentService();
        OrderService orderService = new OrderService(inventoryService, paymentService);

        Order order = new Order(id: "89770");
        orderService.placeOrder(order);
    }
}
```

So what is the big deal here still we are creating the instances of `InventoryService` and `PaymentService` in the `Main` class? The big deal is that we can now easily swap out these dependencies with different implementations, such as mock objects for testing or different service implementations for different environments.

Let me show you an example of how we can use Dependency Injection to swap out the `InventoryService` with a mock implementation for testing:

```java
class MockInventoryService implements InventoryService {
    @Override
    public boolean isAvailable(String productId) {
        return true; // Always available for testing
    }

    @Override
    public void updateInventory(String productId) {
        // No-op for testing
    }
}

class Main {
    public static void main(String[] args) {
        InventoryService mockInventoryService = new MockInventoryService();
        PaymentService paymentService = new PaymentService();
        OrderService orderService = new OrderService(mockInventoryService, paymentService);

        Order order = new Order(id: "89770");
        orderService.placeOrder(order);
    }
}
```

In this example, we created a `MockInventoryService` that always returns true for availability and does nothing when updating the inventory. This allows us to test the `OrderService` without relying on the actual `InventoryService`, making our tests faster and more reliable.

So Let's take a look at an example when we don't use Dependency Injection:

```java
class OrderService {

    private final InventoryService inventoryService = new InventoryService();
    private final PaymentService paymentService = new PaymentService();

    void placeOrder(Order order) {
        if (inventoryService.isAvailable(order.getProductId())) {
            paymentService.processPayment(order.getPaymentDetails());
            inventoryService.updateInventory(order.getProductId());
        } else {
            throw new ProductNotAvailableException("Product not available");
        }
    }
}
```

In this example, the `OrderService` class creates its own instances of `InventoryService` and `PaymentService`. This tightly couples the `OrderService` to these specific implementations, making it difficult to change or test them independently. If we wanted to use a different implementation of `InventoryService`, we would have to modify the `OrderService` class itself.

So if you were to mock the `InventoryService` in this case, you would have to modify the `OrderService` class to use the mock implementation, which defeats the purpose of Dependency Injection. So to create a mock implementation, you would have to create a new class that extends `OrderService` and overrides the `placeOrder` method to use the mock implementation. This is not ideal and can lead to code duplication and maintenance issues.

it look something like this

```java
class MockOrderService extends OrderService {

    private final InventoryService mockInventoryService;

    MockOrderService(InventoryService mockInventoryService) {
        this.mockInventoryService = mockInventoryService;
    }

    @Override
    void placeOrder(Order order) {
        if (mockInventoryService.isAvailable(order.getProductId())) {
            paymentService.processPayment(order.getPaymentDetails());
            mockInventoryService.updateInventory(order.getProductId());
        } else {
            throw new ProductNotAvailableException("Product not available");
        }
    }
}
```

In this example, we created a `MockOrderService` that extends the `OrderService` class and overrides the `placeOrder` method to use the mock implementation of `InventoryService`. This is not ideal as it leads to code duplication and makes it harder to maintain the code.

### Types of Dependency Injection

There are several types of Dependency Injection, including:

- **Constructor Injection**: Dependencies are provided through the class constructor
- **Setter Injection**: Dependencies are provided through setter methods

#### Constructor Injection

Constructor Injection is the most common form of Dependency Injection. It involves passing dependencies as parameters to the class constructor

```java
class OrderService {

    private final InventoryService inventoryService;
    private final PaymentService paymentService;

    OrderService(InventoryService inventoryService, PaymentService paymentService) {
        this.inventoryService = inventoryService;
        this.paymentService = paymentService;
    }

    // ...
}
```

#### Setter Injection

Setter Injection involves providing dependencies through setter methods after the object is constructed. This allows for more flexibility, but can lead to partially constructed objects if not used carefully.

```java
class OrderService {

    private InventoryService inventoryService;
    private PaymentService paymentService;

    void setInventoryService(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // ...
}
```

## Conclusion

In this article, we explored the concept of Dependency Injection and its benefits. We discussed how it promotes loose coupling between classes, making it easier to manage dependencies and test code. We also looked at different types of Dependency Injection, including Constructor Injection and Setter Injection.
