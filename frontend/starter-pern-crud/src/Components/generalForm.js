import { useEffect, useState } from "react";
export default function GeneralForm({setupperform,default_value,formtemplete,title,setmodalshow}) {
  const [form, setForm] = useState({...default_value});
  
  let form_templete = [];
  for(let x in formtemplete){
    switch(formtemplete[x].type){
      case "string":
        form_templete.push(<div key={x} className="form-group">
        <label className="form-label text-capitalize">{x}<input className="form-input mt-2" type="text" placeholder={formtemplete[x].placeholder} name={x} value={form[x]} onChange={form_input_change}/></label></div>);
        
      break;
      default:
        console.log(formtemplete[x].type)
    }
  }

  useEffect(()=>{
    document.querySelector("#general-form-modal-id").classList.add("active");
  },[])
//////////////////////////////////////////////////
  function form_input_change(evt){
    let key = evt.currentTarget.name;
    let value = evt.currentTarget.value;
    setForm(pv=>({...pv,[key]:value}));
  }
  function on_close(evt){
    setmodalshow(false);
  }
  function on_reset(evt){
    setForm({...default_value});
  }
  function on_save(evt){
    setupperform({...form});
  }
//////////////////////////////////////////////////
  return (
    <div className="modal" id="general-form-modal-id">
      <div href="#close" className="modal-overlay" aria-label="Close"></div>
      <div className="modal-container">
        <div className="modal-header">
          <div href="#close" className="btn btn-clear float-right" aria-label="Close" onClick={on_close}></div>
          <div className="modal-title h5">{title}</div>
        </div>
        <div className="modal-body">
          <div className="content">
            <form>
              {form_templete}
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <div className="column col-12">
            <button className="btn btn-success mx-2" onClick={on_save}>save</button>
            <button className="btn btn-warning mx-2" onClick={on_reset}>reset</button>
            <button className="btn btn-error mx-2" onClick={on_close}>cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}