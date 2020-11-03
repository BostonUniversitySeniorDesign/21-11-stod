User Table:
_ Id: uuid string
_ username: string
_ Email: string
_ Password: saled hash string (Handled by django) \* group: one to many relationshop with group

Posts:
_ id: some uuid string (PRIMARY KEY)
_ group: string
_ contents: string
_ poster: string (foreign key.. should be in user database)

Groups:
_ name: string (PRIMARY KEY)
_ description: string

groups-to-users:
_ groupName: string (foreign key)
_ userId: string (foreign key)
