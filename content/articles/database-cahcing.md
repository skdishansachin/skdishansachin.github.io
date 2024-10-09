---
title: "Database Caching"
description: "You don't need to hit the database every time."
published: 2024/10/05
slug: "database-caching"
---

> Phil Karlton: "There are only two hard things in computer science: cache invalidation and naming things."

## Introduction

The database plays a crucial role in application performance. A poorly performing database can have a significant impact on the overall performance of the application. Querying and retrieving data from the database is resource-intensive and time-consuming, with high memory usage being one of the few drawbacks. A slow database can result in slow application performance, leading to dissatisfied users.

What can be done about this issue? This is where caching becomes important. Caching enables us to minimize the number of database calls, thereby increasing the speed of our application. This article will cover the concepts of caching, as well as the strategies and challenges associated with it.

## What is Database Caching?

Database caching is a (buffering) technique used to store frequently accessed data from a database in a faster, more readily available storage layer, typically in memory. This approach significantly reduces the need to query the database directly for each request, thereby improving application performance and reducing the load on the database server.

The main idea behind database caching is to keep a copy of the most frequently accessed data in a cache, which can be quickly retrieved when needed. When an application needs to access data, it first checks the cache. If the data is found in the cache (a cache hit), it can be returned immediately without querying the database. If the data is not in the cache (a cache miss), the application retrieves it from the database and stores it in the cache for future use.

Database caching can dramatically improve response times and reduce the load on database servers, especially for read-heavy applications. However, it also introduces challenges related to data consistency and cache invalidation, which need to be carefully managed to ensure data integrity.

## Different caching strategies

Different caching strategies exist, but we will focus on the most common ones to keep things simple. Caching strategies are methods for improving database performance and reducing the load on database servers. These strategies dictate how data is stored, retrieved, and managed within the cache. Each strategy has its advantages and disadvantages, addressing various aspects of application requirements such as data consistency, cache size management, and update frequency. When implementing caching, it is important to select the appropriate strategy or combination of strategies that align with your application's specific needs.

### Cache Aside (Lazy Loading)

Cache Aside, also known as Lazy Loading, is a caching strategy where the application is responsible for maintaining the consistency between the cache and the database. Here's how it works:

When data is requested first the application tries to get the data from the cache. if the data exist on the cache it’s going to get it from the cache and it’s going to return it. If the data is not found in the cache it’s going to get the data from the database store it in the cache and return the data to the user.

Here is a breakdown of what happening.

-   **Read Operations:**
    -   When data is requested, the application first checks the cache.
    -   If the data is found in the cache (cache hit), it's returned immediately.
    -   If the data is not in the cache (cache miss), the application retrieves it from the database, stores it in the cache, and then returns it to the user.
-   **Write Operations:**
    -   When data is updated, the application writes directly to the database.
    -   The corresponding cache entry is invalidated or updated to maintain consistency.

Advantages of Cache Aside:

-   **Flexibility to cache failures:** If the cache fails, the application can still function by reading directly from the database.
-   **Read optimization:** It's particularly effective for read-heavy workloads.
-   **Data consistency:** It provides better control over data consistency as the application manages both cache and database updates.

Disadvantages:

-   **Initial latency:** The first request for any item will always result in a cache miss, causing slightly higher latency.
-   **Data staleness:** There's a possibility of serving stale data if the cache isn't properly invalidated or updated after database changes. Means if the data updates on the database the cache also has to update or invalidate accordingly other wise the application will use the setal data from the cache.

Cache Aside is widely used in many applications due to its simplicity and effectiveness, especially in scenarios where read operations significantly outnumber write operations.

### Read Through Cache

Read Through Cache is a strategy where the cache sits between the application and the database. Here's how it works:

When data is requested, the application always asks the cache for the data. If the data is in the cache, it's returned immediately. If not, the cache itself is responsible for loading the data from the database, storing it, and then returning it to the application. In simple words it’s Cache Aside, but the cache itself handles the database lookups. The application only interacts with the cache.

Breakdown:

-   **Read Operations:**
    -   Application requests data from the cache
    -   If data is present, the cache returns it
    -   If data is absent, the cache fetches it from the database, stores it, and then returns to the application
-   **Write Operations:**
    -   Typically handled by a separate write-through or write-behind strategy

Advantages:

-   **Consistent reads:** The application always reads from the cache, reducing code complexity
-   **Reduced load on application:** Cache manages data retrieval from the database

Disadvantages:

-   **Potential for stale data:** If the database is updated directly, the cache may become out of sync
-   **Increased read latency:** Every read operation goes through the cache layer

Read Through Cache is beneficial for read-heavy applications where data doesn't change frequently, providing a good balance between performance and data consistency.

### Write through cache

Write Through Cache is a strategy where data is written simultaneously to both the cache and the database. Here's how it works:

When data is updated, the application writes the data to the cache. The cache then immediately writes the same data to the database. This ensures that the cache and database are always in sync.

Breakdown:

-   **Write Operations:**
    -   Application updates data in the cache
    -   Cache immediately writes the same data to the database
    -   Write operation is considered complete only when both cache and database are updated
-   **Read Operations:**
    -   Reads are typically handled by a Read-Through or Cache-Aside strategy

Advantages:

-   **Data consistency:** Cache and database are always synchronized
-   **Reliable writes:** Ensures data is not lost in case of cache failures

Disadvantages:

-   **Higher write latency:** Each write operation must wait for both cache and database updates
-   **Increased load on the database:** Every write operation affects the database

Write Through Cache is ideal for applications where data consistency is critical and where the application can tolerate slightly higher write latency for the sake of data integrity.

### Write around cache

Write Around Cache is a strategy where write operations bypass the cache and go directly to the database. Here's how it works:

When data is updated, the application writes the data directly to the database, not to the cache. The cache is only updated when a read operation occurs and the data is not found in the cache (cache miss).

Breakdown:

-   **Write Operations:**
    -   The application writes data directly to the database
    -   The cache is not updated during write operations
-   **Read Operations:**
    -   Reads are typically handled by a Read-Through or Cache-Aside strategy
    -   If data is not in the cache, it's fetched from the database and then cached

Advantages:

-   **Reduced write latency:** Writes are faster as they only update the database
-   **Prevents cache pollution:** Useful for data that is written once and rarely read

Disadvantages:

-   **Increased read latency:** First read after a write will always be a cache miss
-   **Potential for stale data:** The cache may contain outdated information until the next read

Write Around Cache is suitable for write-heavy applications where the written data is not immediately required to be read, and where reducing write latency is more critical than read latency.

### Write behind cache

Write Behind Cache is a strategy where write operations are first performed on the cache and then asynchronously updated in the database. Here's how it works:

When data is updated, the application writes the data to the cache immediately. The cache then queues the write operation and asynchronously updates the database in the background. This allows for faster write operations from the application's perspective.

Breakdown:

-   **Write Operations:**
    -   Application updates data in the cache
    -   Cache queues the write operation
    -   The database is updated asynchronously
-   **Read Operations:**
    -   Reads are typically handled by a Read-Through or Cache-Aside strategy

Advantages:

-   **Improved write performance:** Writes are acknowledged quickly
-   **Reduced database load:** Writes can be batched and optimized

Disadvantages:

-   **Risk of data loss:** If the system crashes before async writes complete
-   **Complexity in ensuring consistency:** Requires careful management of the write queue

Write Behind Cache is suitable for high-write volume scenarios where slight delays in data consistency can be tolerated for the sake of improved performance.

## Conclusion

Database caching is a powerful technique for improving application performance by reducing the load on the database server and minimizing the number of database calls. By storing frequently accessed data in a cache, applications can retrieve data more quickly and efficiently, resulting in faster response times and better user experience.
