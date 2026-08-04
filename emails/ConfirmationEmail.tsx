import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
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
      <Preview>Am primit solicitarea ta ✔</Preview>

      <Body
        style={{
          backgroundColor: "#f6f6f6",
          fontFamily:
            "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: "18px",
            padding: "40px",
          }}
        >
          <Heading
            style={{
              fontSize: "32px",
              marginBottom: "10px",
              color: "#111827",
            }}
          >
            Salut, {name}! 👋
          </Heading>

          <Text
            style={{
              fontSize: "17px",
              color: "#4b5563",
              lineHeight: "28px",
            }}
          >
            Îți mulțumim că ai completat formularul RBX.AI.
          </Text>

          <Text
            style={{
              fontSize: "17px",
              color: "#4b5563",
              lineHeight: "28px",
            }}
          >
            Am primit toate informațiile și începem analiza manuală a
            proceselor din afacerea ta.
          </Text>

          <Hr />

          <Section>
            <Heading
              as="h2"
              style={{
                fontSize: "22px",
                color: "#111827",
              }}
            >
              Ce urmează?
            </Heading>

            <Text style={{ lineHeight: "28px" }}>
              ✅ Analizăm răspunsurile tale.
            </Text>

            <Text style={{ lineHeight: "28px" }}>
              ✅ Identificăm unde pierzi timp.
            </Text>

            <Text style={{ lineHeight: "28px" }}>
              ✅ Construim o soluție personalizată.
            </Text>

            <Text style={{ lineHeight: "28px" }}>
              ✅ Revenim către tine în maximum 24 de ore.
            </Text>
          </Section>

          <Hr />

          <Text
            style={{
              color: "#6b7280",
              fontSize: "15px",
              lineHeight: "26px",
            }}
          >
            Până atunci nu trebuie să faci nimic.
            <br />
            Ne ocupăm noi de tot.
          </Text>

          <Text
            style={{
              marginTop: "40px",
              color: "#111827",
              fontWeight: 600,
            }}
          >
            — Echipa RBX.AI
          </Text>
        </Container>
      </Body>
    </Html>
  );
}