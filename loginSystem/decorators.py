#> Import Our Stuff
from .packages import *




#> Decoratore For The User That Already Logged In
def alreadyLoggedIn(view_func):
    def inside(request,*args,**kwargs):
        if request.user.is_authenticated:
            return redirect("testPage")
        else:
            return view_func(request,*args,**kwargs)
    return inside


    