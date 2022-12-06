# Data Models and Query Languages

Comparing various data models such as relational vs NoSQL document model.

Document models (e.g. MongoDB) have the advantage of *locality*, where all of the needed data is stored together because relationships are avoided.

However, once relationships are introduced, the document model becomes less desirable. For example, a good use of the document model could be a person's LinkedIn profile page. All of the data for their resumé is self-contained and fast.

The problem is, if the developers decide that organizations and educational institutions should have their own page, the document model breaks down. The data was denormalized in the document model, but now they should be their own documents. You'd have to write every single record to change the duplicate organization to use a foreign id.

This leads to another issue with the document model: schema flexibility.

### Schema Flexibility

It's a bit of a misnomer to say the document model is *schemaless*. Eventually, somewhere a schema must be assumed. Therefor, it's more like schema-on-read. The application implicitly assumes a schema when working with the data.

This is different from the relational model, which is schema-on-write. Enforcing the schema on write ensures all data conforms to the format. A good analogy is the difference between dynamic (runtime) type-checking in a programming language vs static (compile-time) type-checking.

The difference becomes apparent when the application wants to change the schema.

Example: You want to now store the first and last names as separate fields in place of the full name.

In the document model, you would start writing new documents with the new schema, and have to dynamically adjust to whether a given document is using the old or new schema when referencing the updated fields:

```javascript
if (user && user.name && !user.first_name) {
  user.first_name = user.name.split(' ')[0];
}
```

In a relational "statically typed" database schema, you would perform a migration and update all of the existing records up front:

```sql
ALTER TABLE users ADD COLUMN first_name text;
UPDATE users SET first_name = substring_index(name, ' ', 1);
```

These changes have a reputation for being slow, which is deserved if using MySQL. Other relational databases don't seem to have this problem. MySQL *copies the entire table* when performing an alter statement, which can mean minutes or hours of downtime depending on the size of the table. 

Tools exist that can negate this MySQL issue, such as Github's gh-ost.

Running the `UPDATE` statement will be slow on a large table in any database. You could always orchestrate the application to leave the field to its default NULL and fill it in at read time.

### Data locality for queries

A document is typically a single continuous string. If you only need a small part of the document, it can be wasteful because you have to load the entire thing. Updates to a document typically require the entire document to be rewritten unless the changes don't change the encoded size.

Certain relational databases compensate for their lack of locality with various patterns.
* Google's Spanner DB has locality properties by allowing the schema to declare that a table's rows should be interleaved within a parent table.
* Oracle allows *multi-table index cluster tables*.
* The *column-family* concept in the Bigtable data model (Cassandra, HBase).

### Convergence

Relational databases mostly now support XML and JSON formats, allowing for the functionality of a document model.

## Query Languages for Data

SQL is a *declarative* language, whereas older query langauges such as IMS and CODASYL queried using *imperative* code. Most programming languages are *imperative*. For example:

```javascript
function getSharks() {
  var sharks = [];
  for (let i = 0; i < animals.length; i++) {
    if (animals[i].family === 'Sharks') {
      sharks.push(animals[i]);
    }
  return sharks;
}
```

vs declaratively:

```sql
SELECT * FROM animals WHERE family = 'Sharks';
```

In a declarative language, you *declare* what you want--the pattern of data, the conditions, and how you want it (sorted, grouped, aggregated). But you don't specify how to achieve that goal.

Declarative languages often lend themselves to parallel execution, which is beneficial since CPUs are getting faster by adding more cores. Imperative code is very hard to parallelize because its instructions must be performed in a specified order.

## MapReduce Querying

MapReduce is a paradigm for processing large amounts of data popularized by Google.

The idea is to use functional programming functions (map and reduce) to process data.

Many NoSQL datastores support a limited form of MapReduce.

It allows you to leverage JavaScript in the middle of your query.

These functions lack the ability to be optimized the way a declarative language can be.

MongoDB added a declarative language called the *aggregation pipeline* that has a JSON-like syntax. 

NoSQL may find itself reinventing SQL.
