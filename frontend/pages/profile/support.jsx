// Support Page
function SupportLink(props) {
    return (
      <div className="support-link">
        <h3>{props.title}</h3>
        <p>{props.body}</p>
      </div>
    );
  }
  
  export default function Support() {
    return (
      <div className="container">
        <h1>Support Page</h1>
        <SupportLink
          title="How do I make a reservation?"
          body="To make a reservation, please visit our website or call our restaurant directly."
        />
        <SupportLink
          title="What are your hours of operation?"
          body="Our restaurant is open from 11am to 9pm every day of the week."
        />
        <SupportLink
          title="Do you offer vegetarian options?"
          body="Yes, we have several vegetarian options on our menu."
        />
        <SupportLink
          title="How do I provide feedback on my experience?"
          body="We value your feedback and would love to hear about your experience. Please email us at feedback@newcastlerestaurants.com."
        />
      </div>
    );
  }