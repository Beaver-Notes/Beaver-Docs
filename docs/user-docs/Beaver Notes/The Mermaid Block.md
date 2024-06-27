---
sidebar_position: 5
---

The mermaid block allows you to create diagrams using Mermaid.js. It supports a variety of diagram types, including flowcharts, sequence diagrams, class diagrams, state diagrams, Gantt charts, and more.

To insert a mermaid block, type `::mermaid` in the editor and press enter. A blank block will appear. By clicking on it, you'll be able to edit its contents, much like with the math block.

## Flowcharts

```mermaid
graph TD
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[Result 1]
    C -->|No| E[Result 2]
```

- `graph D` specifies the direction of the flowchart (top to bottom in this case). You can also use `LR for left to right`, `RL for right to left`, and `BT for bottom to top`.
- `A[Start]` creates a node labeled "Start".
- `-->` creates a directed link from one node to another.
- `{Decision}` creates a decision node (diamond-shaped).
- `--> |Yes|` creates a conditional link labeled "Yes".

## Sequence Diagrams

```mermaid
sequenceDiagram
    participant A as Alice
    participant B as Bob
    A->>B: Hello Bob, how are you?
    B-->>A: I am good thanks!
    Note right of B: Bob thinks
    B->>C: How about you?
    C-->>B: I'm fine too!
```

- `sequenceDiagram` specifies the start of a sequence diagram.
- `participant A` as Alice defines a participant with a display name.
- `A->>B: Message` sends a message from A to B.
- `Note right of B` adds a note to the right of participant B.

## Advanced Sequence Diagrams

Sequence diagrams can be enhanced with loops, alternatives (alt), and options (opt).


```mermaid
sequenceDiagram
    participant A as Alice
    participant B as Bob
    A->>B: Hello Bob
    alt Is Bob busy?
        B-->>A: Yes, I am busy
    else
        B-->>A: No, I am free
        opt Extra time?
            B-->>A: Let's grab a coffee
        end
    end
    loop Daily routine
        B-->>A: Check email
    end
```

- `alt ... else` creates an alternative block with conditions.
- `opt` creates an optional block.
- `loop` creates a loop block.

## Class Diagrams

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
    }
    Animal <|-- Dog
```

- `classDiagram` specifies the start of a class diagram.
- `class Animal {}` defines a class named Animal.
- `+String name` defines a public attribute.
- `+makeSound()` defines a public method.
- `Animal <-- Dog` indicates inheritance, where Dog inherits from Animal.

## State Diagrams

```mermaid
stateDiagram
    [*] --> Idle
    Idle --> Processing : Event1
    Processing --> Done : Event2
    Done --> [*]
```

- `stateDiagram` specifies the start of a state diagram.
- `[ * ]` represents the start state.
- `Idle --> Processing : Event1` defines a transition from Idle to Processing triggered by Event1.

## Gantt Charts

```mermaid
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    Task1           :a1, 2023-01-01, 30d
    Task2           :after a1  , 20d
    Task3           : 2023-01-15, 25d
```

- `gantt` specifies the start of a Gantt chart.
- `title` sets the title of the chart.
- `dateFormat` specifies the date format.
- `section` defines a section of tasks.
- `Task1 :a1, 2023-01-01, 30d` defines a task with an `ID, start date, and duration.`
- `:after a1` schedules the task to start after task a1 completes.

## Pie Charts

Pie charts are used to represent data in a circular graph.

```mermaid
pie
    title Pie Chart Example
    "Category A" : 40
    "Category B" : 20
    "Category C" : 30
    "Category D" : 10
```

- `pie` specifies the start of a pie chart.
- `title` sets the title of the chart.
- `"Category A" : 40` defines a segment of the pie chart with a `label and value`.

## Entity Relationship Diagrams (ERD)

ERDs are used to represent the relationships between entities in a database.

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        string name
        string address
    }
    ORDER {
        int id
        string product
        int quantity
    }
```

- `erDiagram` specifies the start of an ER diagram.
- `CUSTOMER ||--o{ ORDER : places` defines a relationship where a customer places orders.
- `CUSTOMER {}` defines an entity with attributes.
- `int id` defines an attribute with a type.

## Commit Flow Diagram

```mermaid
gitGraph
   commit
   branch develop
   checkout develop
   commit
   commit
   branch feature-1
   checkout feature-1
   commit
   checkout develop
   merge feature-1
   commit
   checkout main
   merge develop
   commit
```

- `gitGraph` specifies the start of a commit flow diagram.
- `commit` creates a commit.
- `branch develop` creates a new branch named develop.
- `checkout develop` switches to the develop branch.
- `merge feature-1` merges the `feature-1` branch into the `current branch`.

## User Journey Diagram

```mermaid
journey
    title User Journey for Booking a Flight
    section Search
      User searches for flights: 5: User
    section Select
      User selects a flight: 5: User
      System shows flight details: 3: System
    section Book
      User enters passenger details: 5: User
      System confirms booking: 4: System
```
- `journey` specifies the start of a user journey diagram.
- `section` creates a new section in the journey.
- `User searches for flights: 5: User` describes an action, a `rating, and an actor`.

## Quadrant Chart

```mermaid
quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]
    Campaign E: [0.40, 0.34]
    Campaign F: [0.35, 0.78]
```
- `quadrantChart` specifies the start of a quadrant chart.
- `title Reach and Engagement of Campaigns` sets the title of the chart.
- `x-axis Low Reach --> High Reach` labels the `x-axis` with a range.
- `y-axis Low Engagement --> High Engagement labels` the `y-axis` with a range.
- `quadrant-1: We should expand` to `quadrant-4: May be improved` label the four quadrants.
- `"Campaign A" : [0.3, 0.6]` plots a point representing Campaign A with specific coordinates.


## XY Chart (XYChart-Beta)

```mermaid
xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
```

- `xychart-beta` specifies the start of an XY chart.
- `title "Sales Revenue"` sets the title of the chart.
- `x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]` labels the x-axis with months.
- `y-axis "Revenue (in $)" 4000 --> 11000` labels the y-axis with a range for revenue.
- `bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]` plots a bar chart with the given data points.
- `line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]` plots a line chart with the same data points.