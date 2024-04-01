import "../styles/about.scss"; // Import the SCSS file for styling

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
          metus ut odio lacinia commodo. Vivamus sodales nisl vitae commodo
          bibendum. Phasellus nec pulvinar nulla. Duis dapibus libero justo, ut
          scelerisque magna luctus non. Integer eu est non nulla eleifend
          hendrerit. Vestibulum commodo, nisi ut fermentum fermentum, urna
          libero euismod justo, eget tempor risus augue id dolor.
        </p>
        <div className="company-info">
          <h3>Company: Geeksynergy Technologies Pvt Ltd</h3>
          <p>
            Address: Sanjayanagar, Bengaluru-56
            <br />
            Phone: XXXXXXXXX09
            <br />
            Email: XXXXXX@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
