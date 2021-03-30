from django.db import models
from django.contrib.auth.models import User

class FriendList(models.Model):
    user = models.OneToOneField(User, related_name="user", on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, related_name="friend_requests", blank=True)
    current_user = models.ForeignKey(User, related_name="owner", null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.user.username
    # @classmethod

    def make_friend(self, account):
        if not account in self.friends.all():
            self.friends.add(account)
            self.save()


    # @classmethod
    def remove_friend(cls, account):
        if account in self.friends.all():
            self.friends.remove(account)
            self.save()
    
    def unfriend(cls, removee):
        remover_friend_list = self
        remover_friend_list.remove_friend(removee)

        friends_list = Friendship.objects.get(user=removee)
        friends_list.remove(self.user)

    def is_mutual_friend(self, friend):
        fr = User.objects.get(username=friend)
        if fr in self.friends.all():
            return True
        return False
    

class FriendRequest(models.Model):
    sender = models.ForeignKey(User, related_name="sender", on_delete=models.CASCADE, to_field="username")
    reciver = models.ForeignKey(User, related_name="reciver", on_delete=models.CASCADE, to_field="username")
    is_active = models.BooleanField(blank=True, null=False, default=True)
    declined = models.BooleanField(blank=True, null=False, default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.sender.username
    
    def accept(self):
        rec = User.objects.get(username=self.reciver)
        send = User.objects.get(username=self.sender)
        reciver_list = FriendList.objects.get_or_create(user=rec)[0]
        if reciver_list:
            reciver_list.make_friend(send)
            sender_list = FriendList.objects.get_or_create(user=send)[0]
            if sender_list:
                sender_list.make_friend(rec)
                self.is_active = False
                self.save()
    
    def decline(self):
        self.is_active = False
        self.declined = True
        self.save()

    def cancel(self):
        self.is_active = False
        self.save()




    # @classmethod
    # def add_friend_request(cls, current_user_id, new_friend_id):
    #     current_user = User.objects.find(id=current_user_id)
    #     new_friend = User.objects.find(id=new_friend_id)

    #     friend, created = cls.objects.get_or_create(
    #         current_user = current_user
    #     )
    #     friend.friend_requests.add(new_friend)
    
    # @classmethod
    # def decline_friend_request(cls, current_user_id, new_friend_id):
    #     current_user = User.objects.find(id=current_user_id)
    #     new_friend = User.objects.find(id=new_friend_id)

    #     friend, created = cls.objects.get_or_create(
    #         current_user = current_user
    #     )
    #     friend.friend_requests.remove(new_friend)

    # def __str__(self):
    #     return str(self.current_user)