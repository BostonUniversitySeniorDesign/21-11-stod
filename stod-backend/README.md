User Table:

- Id: uuid string
- username: string
- Email: string
- Password: saled hash string (Handled by django) \* group: one to many relationshop with group

Posts:

- id: some uuid string (PRIMARY KEY)
- group: string
- contents: string
- poster: string (foreign key.. should be in user database)

Groups:

- name: string (PRIMARY KEY)
- description: string

groups-to-users:

- groupName: string (foreign key)
- userId: string (foreign key)
