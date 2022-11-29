# BeSocial

Web app to track and decrease social media usage

## BeSocial - FRONT END

NextJs project

This project was developed using:

> axios
> chart.js
> firebase
> react-charjs-2
> react-loader-spinner
> semantic-ui-react
> sweetalert2

### Execute

1. Go to the project folder in a terminal
2. Install the corresponding dependencies with 
```
yarn
```
3. Run the project in development mode with
```
yarn dev
```

## BeSocial - API REST

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
 }
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
### Output

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

## Delete One

Create Stat for an specific user in an specific date

> **Endpoint**: api.url/stats/:user_email
> **Http Method**: Delete
### Output

```typescript
{
 message:  string,
 data:  {
  ...,
  //facebook: 3,
  //twitter: 1
  <socialMediaName>: number
 }
}
```

## Users

With this Endpoint you can handle all operations related to Users.

## Login

If user dont exist it's created in the database, otherwise it's returned from database

> **Endpoint**: api.url/users/login
> **Http Method**: Delete

### Input

```typescript
{
 email: string,
 username: string
}
```
### Output

```typescript
{
 message:  string,
 data:  {
  username: string,
  email: string
 },
 created: boolean
}
```

## Quotes

With this Endpoint you can retrieve quotes warning to social media usage.

## Read All

retrieve all quotes from the database

> **Endpoint**: api.url/quotes
> **Http Method**: Get

### Output

```typescript
[
  {
    author: string,
    message: string,
    role: string
  }
]
```

### Execute

1. Go to the project folder in a terminal
2. Install the corresponding dependencies with 
```
yarn
```
1. Run the project in with
```
yarn start
```