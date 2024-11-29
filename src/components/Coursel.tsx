import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';



const Carouselplay: React.FC = () => (
  <Carousel className='min-h-80 rounded-xl overflow-clip' arrows autoplay>
    <div className='min-h-96 bg-blue-200 relative'>
        <Image src={"https://d33wubrfki0l68.cloudfront.net/c3f66284b4ed4de2785a5fcc629be503d6399797/a13c0/assets/images/1.jpg"} className='object-cover' alt='' fill/>
      <h3>1</h3>
    </div>
    <div className='min-h-96 bg-blue-200 relative'>
      <h3>2</h3>
      <Image src={"https://d33wubrfki0l68.cloudfront.net/8a1c15f9383dd799899c695372dd8a22715ebd4b/1a315/assets/images/2.jpg"} className='object-cover' alt='' fill/>

    </div>
    <div className='min-h-96 bg-blue-200 relative'>
      <h3>3</h3>
      <Image src={"https://d33wubrfki0l68.cloudfront.net/8a595f4793ed112a9a00389b1c99eb538e67eb39/84a3b/assets/images/3.jpg"} className='object-cover' alt='' fill/>

    </div>
    <div className='min-h-96 bg-blue-200 relative'>
      <h3>4</h3>
      <Image src={"https://i.pinimg.com/736x/65/0c/eb/650cebe8e41c425ae0b69735d04922ca.jpg"} className='object-cover' alt='' fill/>

    </div>
  </Carousel>
);

export default Carouselplay;