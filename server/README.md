### Server for take home code test for Notable

### to run

`yarn; yarn serve`

Port will be listening on 3001

### docs

#### GET

`/physicians`: returns an Object of physicians, with the key being the id, and the information as value. Example:

```
{
  "1": {
    fname: "Ali", // String
    lname: "Strange", // String
    email: "strange@notablehealth.com", // String
  },
}
```

`/appointments`: receives parameter `id` returns an Object of appointment, with the key being the id, and the information as value which is an array. Example:

```
{
  "1": [
    {
      name: "Sterling Archer", // String
      type: "New Patient", // String
      time: "8:00 AM", // String
    },
  ],
}
```
