---
title: "The Claim Check Pattern"
description: "The Claim Check Pattern is an enterprise integration pattern (EIP) that helps handle the transport of large messages in a messaging system more efficiently."
pubDate: 2025-09-02
draft: false
tags:
  - "patterns"
  - "messaging"
---

The Claim Check Pattern is an enterprise integration pattern that allows a system to send lightweight messages by replacing large or sensitive payloads with a reference (a "claim check"). The actual payload is stored in a shared, reliable datastore. Consumers of the message can use the claim check to retrieve the payload when needed.

In other words, instead of passing a heavy box around, you pass around a receipt (the claim check) that lets you pick up the box from storage later.

## How It Works

1. **Producer stores payload** - The producer saves the large data payload in a shared storage system.

2. **Producer sends claim check** - Instead of embedding the payload in the message, the producer sends a lightweight message containing only metadata and a reference.

3. **Consumer receives claim check** - The consumer processes the message and uses the claim check to fetch the actual payload from the shared storage.

4. **Consumer processes payload** - Once retrieved, the consumer can process the payload just like it would in a traditional message-driven system.

## Benefits

- **Reduced network overhead:** Messages are small and fast to transmit.

- **Improved scalability:** Services handle less data in transit, reducing strain on message brokers.

- **Flexible payload storage:** Payloads can be stored in scalable, durable stores (e.g., Amazon S3, Redis, or a blob store).

- **Security and access control:** Sensitive data doesn’t travel with every message—access can be controlled at the storage layer.

## When to Use the Claim Check Pattern

The Claim Check Pattern is especially useful when:

- Payloads are too large to efficiently pass through a message bus.
- Message throughput needs to be optimized.
- Data security requires separating metadata from sensitive content.

If payloads are small, frequent, and critical to message context, a direct messaging approach may be simpler and more efficient.

## Conclusion

The Claim Check Pattern is a powerful tool in the system architect’s toolbox. By separating heavy payloads from lightweight messages, it helps distributed systems achieve scalability, performance, and security. Like any pattern, it comes with trade-offs, but when applied in the right context—such as media pipelines, large-scale event systems, or IoT workloads—it can greatly improve system efficiency and reliability.