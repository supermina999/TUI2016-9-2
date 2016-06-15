function rururu(f){
   var a = [];
   var na = [];
   a = f.split("\r\n");
   for(var i=0; i<a.length; i++){
      na.push(a[i].split(' '))
   }

   var obj1 = {}
   obj1.m = na[0][0]
   obj1.n = na[0][1]
   obj1.Turns = na[0][2]
   obj1.Mode = na[0][3]
   obj1.g1 = {x: na[1][0],
     y: na[1][1]
   }
   obj1.g2 = {x :na[1][2],
    y :na[1][3]
}

  for(var i=1; i< 2 * obj1.Turns + 1; i++){
      obj1.i = na[0][i+1];
  }
   return obj1

}

n = "19 293 2 39323\r\n384 3434 76 34\r\n45";
console.log(rururu(n));
