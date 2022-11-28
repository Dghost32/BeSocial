# BeSocial - API REST

This is the api of the BeSocial project, here you'll find usefull documentation to read or edit any of the endpoints.

## How it works

This API is created using different web technologies

- Express
- Firestore Firebase Cloud Storage

## Stats

With this Endpoints group you can handle all CRUD operations related to Stats.

## Create One

Create Stat for an specific user

> **Endpoint**: api.url/stats/:user_email
> **Http Method**: Post
  
### Input

```typescript
{
 stats:  {
  ...,
  //facebook: 3
  //twitter: 2
  <socialMediaName>: number
 },
 secret: string
}
```

### Output

```typescript
{
 message:  string,
 data:  {
  email:  string,
  totalUsage: number,
  date: Date,
  stats:  {
  ...,
  //facebook: 3,
  //twitter: 1
  <socialMediaName>: number
 },
}
```

## Read All

Get all stats from all users
> **Endpoint**: api.url/stats/
> **Http Method**: Get

### Output

```typescript
[
 {
  message: string,
  labels: string[],
  dataset: number[],
  dailyTotal: number,
  data: [
   ...,
   {
   user_id: string,
   username: string,  
   stats: {
    ...,
    //facebook: 3
    <socialMediaName>: number
   },  
   //YYYY/MM/DD
   date: Date
   }
  ]
 }
]
```

## readByUser

Get all stats from a specific user
>**Endpoint**: api.url/stats/:user_email
>**Http Method**: Get

>**EXAMPLE**: _api.url/stats/10_

### Output

```typescript
[
 {
  message: string,
  labels: string[],
  dataset: number[],
  dailyTotal: number,
  data: [
   ...,
   {
    user_id: string,
    username: string,  
    stats: {
    ...,
    //facebook: 3
    <socialMediaName>: number
    },  
    //YYYY/MM/DD
    date: Date
    }
   ]
  }
]
```

## readByUserAndDate

Get stat from a specific user in a specific day
>**Endpoint**: api.url/stats/:user_id/:date
>**Http Method**: Get

>**EXAMPLE**: _api.url/stats/10/2001-06-15_

## Output

```typescript
{
 message: string,
 labels: string[],
 dataset: number[],
 dailyTotal: number,
 data: [
  ...,
  {
  user_id: string,
  username: string,  
  stats: {
   ...,
   //facebook: 3
   <socialMediaName>: number
  },  
  //YYYY/MM/DD
  date: Date
  }
 ]
}
```
