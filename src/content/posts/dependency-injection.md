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

```java
enum PaymentMethod {
    STRIPE,
    PAYPAL,
    PADDLE,
}

class StripePaymentProcessor {
    void pay(double amount) {
        // Stripe payment logic
    }
}

class PaypalPaymentProcessor {
    void pay(double amount) {
        // PayPal payment logic
    }
}

class PaddlePaymentProcessor {
    void pay(double amount) {
        // Paddle payment logic
    }
}
```

This code is tightly coupled because the `PaymentService` class is responsible for creating instances of the payment processors. This makes it difficult to change the payment method or to test the `PaymentService` class in isolation.

```java
class PaymentService {
    private final StripePaymentProcessor stripePaymentProcessor = new StripePaymentProcessor();
    private final PaypalPaymentProcessor paypalPaymentProcessor = new PaypalPaymentProcessor();
    private final PaddlePaymentProcessor paddlePaymentProcessor = new PaddlePaymentProcessor();

    void processPayment(PaymentMethod paymentMethod, double amount) {
        switch (paymentMethod) {
            case STRIPE:
                stripePaymentProcessor.pay(amount);
                break;
            case PAYPAL:
                paypalPaymentProcessor.pay(amount);
                break;
            case PADDLE:
                paddlePaymentProcessor.pay(amount);
                break;
        }
    }
}
```

Here we are using a switch statement to determine which payment processor to use. This is not only hard to maintain but also makes it difficult to test the `PaymentService` class in isolation.

```java
class Application {
    public static void main(String[] args) {
        PaymentService paymentService = new PaymentService();
        paymentService.processPayment(PaymentMethod.STRIPE, 100.0);
    }
}
```

So the `Application` class is responsible for creating the `PaymentService` instance and calling the `processPayment` method. This is not a good design because it makes it difficult to change the payment method or to test the `PaymentService` class in isolation.

Now let's see how we can use Dependency Injection to improve this design. We will create an interface for the payment processor and use constructor injection to inject the payment processor into the `PaymentService` class.

```java
interface PaymentProcessor {
    void pay(double amount);
}

class StripePaymentProcessor implements PaymentProcessor {
    @Override
    public void pay(double amount) {
        // Stripe payment logic
    }
}

class PaypalPaymentProcessor implements PaymentProcessor {
    @Override
    public void pay(double amount) {
        // PayPal payment logic
    }
}

class PaddlePaymentProcessor implements PaymentProcessor {
    @Override
    public void pay(double amount) {
        // Paddle payment logic
    }
}
```

Now we have an interface `PaymentProcessor` that defines the `pay` method. Each payment processor class implements this interface. This allows us to use any payment processor interchangeably.

```java
class PaymentService {
    private final PaymentProcessor paymentProcessor;

    public PaymentService(PaymentProcessor paymentProcessor) {
        this.paymentProcessor = paymentProcessor;
    }

    void processPayment(double amount) {
        paymentProcessor.pay(amount);
    }
}
```

Now the `PaymentService` class does not create the payment processor instance itself. Instead, it receives it through the constructor. This makes it easy to change the payment processor or to test the `PaymentService` class in isolation.

```java
class Application {
    public static void main(String[] args) {
        PaymentProcessor paymentProcessor = new StripePaymentProcessor();
        PaymentService paymentService = new PaymentService(paymentProcessor);
        paymentService.processPayment(100.0);
    }
}
```

In this example, we are using the `StripePaymentProcessor` class as the payment processor. But we can easily change it to use `PaypalPaymentProcessor` or `PaddlePaymentProcessor` without changing the `PaymentService` class.
