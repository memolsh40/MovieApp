
import Slider from '../Components/Slider';
import ItemSlider from '../Components/ItemSlider'

 export const Home=()=>{
        return(
        <div className=' text-light'>
          <Slider />
          <div className='itemSliderBackground custom-dark-color'>
          <ItemSlider title="فیلم های ایرانی" link="/api/movies/iranianM"/>
      
          </div>
          <div className='itemSliderBackground custom-dark-color'>
  
          <ItemSlider title="فیلم های خارجی" link="/api/movies/nonIranian"/>
          </div>

          <div className='itemSliderBackground custom-dark-color'>
  
          <ItemSlider title="سریال های ایرانی" link="/api/series/iranianS"/>
          </div>
          <div className='itemSliderBackground custom-dark-color'>
  
          <ItemSlider title="سریال های خارجی" link="/api/series/nonIranianS"/>
          </div>
         
        
          
        </div>
        );



}

