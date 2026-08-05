import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type Props = {
  name: string;
};

export default function ConfirmationEmail({ name }: Props) {
  return (
    <Html>
      <Head />

      <Preview>
        Solicitarea ta a fost primită. Începem analiza afacerii tale.
      </Preview>

      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Link href="https://www.rbxagency.com" style={brandStyle}>
              RBX.AI
            </Link>

            <Text style={taglineStyle}>SISTEME AI PENTRU AFACERI</Text>
          </Section>

          <Section style={heroStyle}>
            <Text style={labelStyle}>SOLICITARE PRIMITĂ</Text>

            <Heading style={titleStyle}>Salut, {name}.</Heading>

            <Text style={leadStyle}>Formularul tău a ajuns cu succes.</Text>

            <Text style={paragraphStyle}>
              Începem analiza informațiilor trimise pentru a identifica
              procesele care îți consumă timpul, activitățile repetitive și
              oportunitățile în care automatizarea poate produce cel mai mare
              impact.
            </Text>
          </Section>

          <Section style={darkCardStyle}>
            <Text style={darkLabelStyle}>CE PRIMEȘTI</Text>

            <Heading as="h2" style={darkTitleStyle}>
              O analiză clară, adaptată afacerii tale.
            </Heading>

            <Text style={darkStepStyle}>
              <span style={numberStyle}>01</span>
              Analiza proceselor actuale.
            </Text>

            <Hr style={darkDividerStyle} />

            <Text style={darkStepStyle}>
              <span style={numberStyle}>02</span>
              Identificarea activităților repetitive și a timpului pierdut.
            </Text>

            <Hr style={darkDividerStyle} />

            <Text style={darkStepStyle}>
              <span style={numberStyle}>03</span>
              Recomandări potrivite situației și obiectivelor tale.
            </Text>

            <Hr style={darkDividerStyle} />

            <Text style={{ ...darkStepStyle, marginBottom: 0 }}>
              <span style={numberStyle}>04</span>
              Un răspuns personal în maximum 24 de ore.
            </Text>
          </Section>

          <Section style={nextStyle}>
            <Text style={labelStyle}>CE URMEAZĂ</Text>

            <Heading as="h2" style={sectionTitleStyle}>
              De aici ne ocupăm noi.
            </Heading>

            <Text style={paragraphStyle}>
              Nu trebuie să pregătești nimic în plus. Dacă informațiile sunt
              suficiente, vei primi direct recomandările inițiale.
            </Text>

            <Text style={paragraphStyle}>
              Dacă avem nevoie de un detaliu suplimentar, te vom contacta
              înainte de formularea soluției.
            </Text>

            <Button href="https://www.rbxagency.com" style={buttonStyle}>
              DESCOPERĂ RBX.AI
            </Button>
          </Section>

          <Hr style={dividerStyle} />

          <Section style={footerStyle}>
            <Text style={signatureStyle}>Bogdan Rus</Text>

            <Text style={footerTextStyle}>
              Fondator{" "}
              <Link
                href="https://www.rbxagency.com"
                style={footerLinkStyle}
              >
                RBX.AI
              </Link>
              <br />
              <Link
                href="mailto:contact@rbxagency.com"
                style={footerLinkStyle}
              >
                contact@rbxagency.com
              </Link>
              <br />
              <Link
                href="https://www.rbxagency.com"
                style={footerLinkStyle}
              >
                rbxagency.com
              </Link>
              <br />
              <Link
                href="https://www.instagram.com/bogdanrus.ai/"
                style={footerLinkStyle}
              >
                @bogdanrus.ai
              </Link>
            </Text>

            <Text style={legalStyle}>
              Ai primit acest email deoarece ai completat formularul de analiză
              de pe website-ul{" "}
              <Link
                href="https://www.rbxagency.com"
                style={legalLinkStyle}
              >
                RBX.AI
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  margin: "0",
  padding: "48px 16px",
  backgroundColor: "#eeeeee",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
};

const containerStyle = {
  width: "100%",
  maxWidth: "620px",
  margin: "0 auto",
  overflow: "hidden",
  backgroundColor: "#ffffff",
  border: "1px solid #d9d9d9",
};

const headerStyle = {
  padding: "30px 38px",
  backgroundColor: "#090909",
};

const brandStyle = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "700",
  letterSpacing: "-0.6px",
  textDecoration: "none",
};

const taglineStyle = {
  margin: "8px 0 0",
  color: "#8c8c8c",
  fontSize: "10px",
  fontWeight: "600",
  letterSpacing: "2px",
};

const heroStyle = {
  padding: "46px 38px 40px",
};

const labelStyle = {
  margin: "0 0 20px",
  color: "#777777",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "1.8px",
};

const titleStyle = {
  margin: "0 0 18px",
  color: "#111111",
  fontSize: "38px",
  lineHeight: "44px",
  fontWeight: "700",
  letterSpacing: "-1.4px",
};

const leadStyle = {
  margin: "0 0 14px",
  color: "#1a1a1a",
  fontSize: "18px",
  lineHeight: "29px",
  fontWeight: "600",
};

const paragraphStyle = {
  margin: "0 0 18px",
  color: "#5a5a5a",
  fontSize: "15px",
  lineHeight: "26px",
};

const darkCardStyle = {
  margin: "0 26px",
  padding: "34px 30px",
  backgroundColor: "#111111",
};

const darkLabelStyle = {
  margin: "0 0 14px",
  color: "#858585",
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "1.8px",
};

const darkTitleStyle = {
  margin: "0 0 28px",
  color: "#ffffff",
  fontSize: "23px",
  lineHeight: "31px",
  fontWeight: "600",
};

const darkStepStyle = {
  margin: "0",
  color: "#d4d4d4",
  fontSize: "14px",
  lineHeight: "23px",
};

const numberStyle = {
  display: "inline-block",
  width: "38px",
  color: "#777777",
  fontSize: "12px",
  fontWeight: "700",
};

const darkDividerStyle = {
  margin: "17px 0",
  borderColor: "#2d2d2d",
};

const nextStyle = {
  padding: "44px 38px 38px",
};

const sectionTitleStyle = {
  margin: "0 0 18px",
  color: "#111111",
  fontSize: "26px",
  lineHeight: "34px",
  fontWeight: "700",
};

const buttonStyle = {
  display: "inline-block",
  marginTop: "8px",
  padding: "15px 22px",
  color: "#ffffff",
  backgroundColor: "#111111",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "1.2px",
  textDecoration: "none",
};

const dividerStyle = {
  margin: "0",
  borderColor: "#dddddd",
};

const footerStyle = {
  padding: "30px 38px 36px",
  backgroundColor: "#f5f5f5",
};

const signatureStyle = {
  margin: "0",
  color: "#111111",
  fontSize: "15px",
  fontWeight: "700",
};

const footerTextStyle = {
  margin: "7px 0 24px",
  color: "#666666",
  fontSize: "13px",
  lineHeight: "21px",
};

const footerLinkStyle = {
  color: "#111111",
  textDecoration: "underline",
};

const legalStyle = {
  margin: "0",
  color: "#999999",
  fontSize: "11px",
  lineHeight: "18px",
};

const legalLinkStyle = {
  color: "#777777",
  textDecoration: "underline",
};
