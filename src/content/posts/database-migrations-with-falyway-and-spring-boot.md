---
title: "Database migrations with Flyway and Spring Boot"
description: "Learn how to manage database migrations with Flyway in a Spring Boot application."
date: "2025-05-01"
hidden: false
---

Flyway is an open-source database migration tool that helps you manage and version your database schema changes. It allows you to apply, track, and roll back migrations consistently and repeatably, which is especially useful when working in teams or across different environments.

Migrations are versioned SQL scripts that contain the changes you want to apply to your database schema. Flyway tracks which migrations have been used and ensures that they are applied in the correct order.

## Adding Flyway to Your Project

Let's add Flyway to your project. If you're using Maven, add this to your `pom.xml`:

```xml
<dependency>
  <groupId>org.flywaydb</groupId>
  <artifactId>flyway-core</artifactId>
</dependency>
```

You could provide the version number as well, but it’s not necessary if you're using Spring Boot. Spring Boot will manage the version for you.

If you're using Gradle, add this to your `build.gradle`:

```
implementation 'org.flywaydb:flyway-core'
```

We also need the appropriate driver for your database. Flyway supports a wide variety of databases like MySQL, Postgres, and H2. For this example, we’ll use PostgreSQL. You can check out this [official documentation](https://documentation.red-gate.com/fd/supported-databases-and-versions-143754067.html) to see the supported databases.

Let's add the PostgreSQL driver to your `pom.xml`:

PostgreSQL:

```xml
<dependency>
  <groupId>org.flywaydb</groupId>
  <artifactId>flyway-database-postgresql</artifactId>
</dependency>
```

If you're using Gradle, add this to your `build.gradle`:

```
implementation 'org.flywaydb:flyway-database-postgresql'
```

Once added, Flyway is ready to go. No extra setup is needed to get basic migrations working.

## Database Configuration

You need to configure your database connection in `application.properties` or `application.yml`. Here’s an example for PostgreSQL:

`application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/your_database  
spring.datasource.username=your_username  
spring.datasource.password=your_password  
```

`application.yml`

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/your_database
    username: your_username
    password: your_password
```

## How Flyway Works

Flyway searches for `.sql` files in the `classpath:db/migration` directory, which is typically `src/main/resources/db/migration`. Each file corresponds to a step in your database schema. You need to create a file that ends with `.sql` and place it in the `src/main/resources/db/migration` directory.

File names follow this pattern:

**{prefix}{version}{separator}{description}.sql**

Don’t worry if you don’t understand this right now, we’ll explain it in the next section.

Flyway tracks which scripts have run using a metadata table (`flyway_schema_history`). It only runs new migrations, in order, and fails fast if something's off. That way, your team stays in sync without stepping on each other’s toes.

## Understanding Versioning in Flyway

Flyway uses versioned migration files to track the history of your schema changes. These files must follow a strict naming convention so Flyway knows the order in which to apply them.

The naming convention is:

**{prefix}{version}{separator}{description}.sql**

Here’s the breakdown:

- prefix: Usually V for versioned migrations (or R for repeatable)
- version: A version number like 1, 2, 3 or 1.1, 1.2.3
- separator: Usually two underscores (__)
- description: A short, human-friendly description of the change

## How Development Looks with Flyway

The only step you have to take is to create your entity class - let's say a Post class - and then create a migration file in `src/main/resources/db/migration`. The migration file contains the SQL to create the table.

Start with creating your entity class:

```java
@Entity
class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String content;

  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;

  // Getters and Setters
}
```

Then create the migration file named something like `V1__create_post_table.sql`:

```sql
CREATE TABLE post (
  id BIGINT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Running Migrations

With Spring Boot, **migrations run automatically at startup**. But you can also run them manually.

With Maven:

```./mvn flyway:migrate```

With Gradle:

```./gradlew flywayMigrate```

This checks the database for pending migrations and applies them in order. If anything is off, Flyway will fail fast and prevent startup.

## Let’s Update the Database

Say you want to add a new column to the post table. First update the entity:

```java
@Entity
class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String content;

  @Column(columnDefinition = "BOOLEAN", defaultValue = "false")
  private boolean published;

  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;

  // Getters and Setters
}
```

Then create a new migration file, for example `V2__add_published_column_to_post_table.sql`:

```sql
ALTER TABLE post ADD COLUMN published BOOLEAN DEFAULT false;
```

When you run your app, Flyway applies the migration automatically.

## Configuring Flyway

The default config is fine for most cases, but you can tweak it in `application.properties` or `application.yml`. Full config options are listed in the [Flyway documentation](https://www.red-gate.com/hub/product-learning/flyway/the-flyway-configuration-files).

To disable Flyway from running at startup:

`application.properties`

```
spring.flyway.enabled=false
```

`application.yml`

```yml
spring:
  flyway:
    enabled: false
```

To change the default migration path:

`application.properties`

`spring.flyway.locations=classpath:db/migrations`

`application.yml`

```yml
spring:
  flyway:
    locations: classpath:db/migrations
```

## Conclusion

Flyway brings consistency and control to database changes — a must-have when working in teams or across environments. With its Spring Boot integration, applying and tracking migrations becomes automatic and predictable.

Whether you're starting a new project or managing a legacy system, Flyway helps your schema evolve alongside your application in a safe and versioned way.