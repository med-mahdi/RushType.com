# Import The Fill That Contain All The Packages
from .packages import *
from .models import Profile


def allUsersApi(name):
    allusers = User.objects.all()
    for user in allusers:
        if user.username == name:
            return True
    return False    




#> Get Geolocation DATA and Save It to a Profile
def userLocationInfo(name,lat,long):
    user = User.objects.get(username=name)
    profile = Profile.objects.get(user=user)

    profile.positon_x = lat
    profile.positon_y = long
    profile.save()
    print("Update User Location Data")    