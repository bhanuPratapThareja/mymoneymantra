import { useRouter } from "next/router";

const TermsAndConditions = (props) => {
  const router = useRouter();
  const goBack = () => {
    const primaryPath = localStorage.getItem("primaryPath");
    localStorage.clear();
    router.push(`/${primaryPath}`);
  };
  const { button, terms_and_conditions } = props.data.terms_and_condition;
  console.log(props.data);
  return (
    <section data-aos="fade-up" className="container aos-init">
      <div className="container product-wrapper">
        <div className="product-wrapper-left aboutUs-left">
          <table>
            <tbody>
              <tr>
                <td
                  dangerouslySetInnerHTML={{ __html: terms_and_conditions }}
                ></td>
              </tr>
            </tbody>
          </table>
          <div>
            <button onClick={goBack}>{button}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
