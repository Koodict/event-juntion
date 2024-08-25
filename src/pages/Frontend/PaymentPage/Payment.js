import React from 'react'
import { BsCart2 } from "react-icons/bs";


export default function Payment() {
  return (
    <>
    

    
  <div className="container" style={{ marginTop: '5rem', marginBottom: '5rem'}}>
  <div className="row">
    <div className="col col-12 col-lg-6  order-2 order-md-1">
<h1>Ticket</h1>
<select className="form-select p-3 w-75 mt-3"  aria-label="Default select example">
        <option style={{display:'none'}}>Quantity</option>
<option>1 Ticket</option><option>2 Ticket</option><option>3 Ticket</option>
<option>4 Ticket</option><option>5 Ticket</option><option>6 Ticket</option>

</select>

<div className="card border-0   w-75 mt-5" style={{backgroundColor:'ghostwhite',padding:'5rem'}}>
<div className="row">
  <div className="col text-center">
  <BsCart2  style={{fontSize:'2rem'}}/>
  </div>
</div>
</div>




    </div>
      <div className="col col-12 col-lg-6  order-2 order-md-1">
          <div className="card border-0 shadow p-4 p-md-5 rounded-3">

              <h5 className='mb-4'>Pay with Card</h5>

                <form>
              <div className="row">
                  <div className="col col-12 ">
                    <label>Card information</label>
                    <div className='input-group'>

        <input type="number" className='form-control p-2' placeholder='1234 1234 1234 1234'  />
        <div className="input-group-append">
  
        <img src="https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/PikPng.com_payment-options-png_4881288.png?alt=media&token=290987c7-9c1f-44b1-a450-81b12342b1ba" className='input-payment'width={80} />
</div>
 </div>
                  <div className='input-group'>
                  <input type="text" className='form-control'  placeholder='MM/YY'   />
                  <input type="email" className='form-control'  placeholder='zip code'   />
                    </div>
                  </div>
              </div>

              <div className="row mt-4">
                  <div className="col col-12">
                  <label>Name on card</label>
                      <input type="text" className='form-control'   />
                  </div>
              </div>
              <div className="row mt-4">
                  <div className="col col-12">
                  <select className="form-select p-2"  aria-label="Default select example">
        <option style={{display:'none'}}>Billing Address</option>
<option>Pakistan</option><option>India</option><option>Iran</option>
<option>Srilanka</option><option>Australia</option><option>England</option>

</select>

          <input type="text" className='form-control'placeholder='Address line 1'   />
          <input type="text" className='form-control' placeholder='Address line 2'  />
<div className='input-group'>
                  <input type="text" className='form-control'  placeholder='City'   />
                  <input type="email" className='form-control'  placeholder='Pin'   />
                    </div>
                    <input type="email" className='form-control'  placeholder='State'   />
                  </div>
              </div>

              <div className="row mt-4">
                  <div className="col col-12">
                      <div className='text-center' >
      <button className='btn btn-primary p-2 w-75 mt-5' type='submit'>Pay</button>
                      </div>
                  </div>
              </div>

                </form>
          </div>

      </div>

  </div>



</div>
    
    
    
    </>
  )
}
