import { Container, Header, LinkButton, Map } from "./components";
import * as Forms from "./forms";
import { useHelp } from "./hooks";
import { BaseLayout } from "./layouts";

function App() {
  const {} = useHelp()
  
  return (
    <>
      <BaseLayout>
        <Map />
        <Container>
          <h3 className="text-7xl font-display font-semibold text-center text-tt-emerald-500 leading-[120%]">Eenvoudig lokalen en<br/> terreinen, huren of<br /> verhuren</h3>
          <h4 className="block mx-auto w-fit mt-16">
            <span className="font-display font-semibold text-tt-emerald-700 text-xl inline-block">begin hier </span>
            <LinkButton to="/account/register?type=tenant" className="inline-block mx-3">als huurder</LinkButton>
            <span className="font-display font-semibold text-tt-emerald-700 text-xl inline-block mr-3">of</span>
            <LinkButton to="/account/register?type=owner" className="inline-block">als verhuurder</LinkButton>
          </h4>
          {/* <Forms.CreateTribe /> */}
        </Container>
      </BaseLayout>
    </>
  );
}

export default App;
