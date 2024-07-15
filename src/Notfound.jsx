import React from 'react';
import {Link} from 'react-router-dom';
function Notfound (){
  return(
    <div className="flex flex-col gap-5 justify-center items-center mt-10 text-white text-xl ">
    <div className="w-48">
      <img  className="w-full h-full object-cover" src="https://rukminim2.flixcart.com/image/850/1000/kzx1a4w0/sticker/m/r/i/medium-404-error-not-found-0-1-an-sb6528-sign-ever-original-imagbtu8ztxntpkx.jpeg?q=20&crop=false"
        alt="404"
      />
    </div>
       <Link className="border rounded-2xl px-4 py-2 bg-primary-default " to="/">
          Home Page
       </Link>
      </div>
  );
}
export default Notfound;