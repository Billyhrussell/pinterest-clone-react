// saves a pin to a collection

// ?: global variables, forgot how to use. Collections will be used almost
// everywhere in website, save button
// might be over complicating w/form. Need to save collection w/pin
// inside of singular pin, handle fn?
// TODO: handleSubmit
function savePinForm(){

  const [formData, setFormData] = useState(initial);
  // controls the setting of form data

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    savePin(formData);
    setFormData(initial);
  }

  return (
    <div className="savePin">
      <form className="SavePinForm" onSubmit={handleSubmit}>

      <select id="collectionTitle" name="collectionTitle">
          {
            userCollections.map(collection =>
            <option value={collection.title}>{collection.title}</option>)
          }
      </select>

      <div>
          <button className="btn btn-primary">
            Save
          </button>
      </div>
      </form>
    </div>
  )
}

export default savePinForm;