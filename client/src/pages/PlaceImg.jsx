const PlaceImg = ({place,index=0}) => {
    if(!place.addedPhoto?.length){
        return'';
    }
    
    return ( 
        <>
            <img className='object-cover' src={'http://localhost:4000/uploads/'+place.addedPhoto[0]} alt="" />
        </>
     );
}
 
export default PlaceImg;