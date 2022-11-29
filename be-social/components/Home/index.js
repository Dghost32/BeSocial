// react
import { useContext, useEffect, useState } from "react";
// nextjs
import { useRouter } from "next/router";
// context
import { UserContext } from "../../context/userContext";
// components
import {
  Button,
  Header,
  Icon,
  Container,
  Card,
  Image,
  Statistic,
  Message,
} from "semantic-ui-react";
import { Audio } from "react-loader-spinner";
// utils
import { getFirstName, getQuotes } from "../../utils";

const Home = () => {
  const router = useRouter();

  const { user, logout } = useContext(UserContext);

  const [quotes, setQuotes] = useState([]);

  const retrieveQuotes = async () => {
    const q_s = await getQuotes();
    setQuotes(q_s);
  };

  useEffect(() => {
    retrieveQuotes();
  }, []);

  return (
    <>
      <Container
        style={{ margin: "2em 0.5em", display: "flex" }}
        className="flex-col align-center"
      >
        <div
          className="flex flex-row align-center"
          style={{
            marginBottom: "1em",
          }}
        >
          <Header as="h1" className="flex align-center">
            <p className="color-accent">Welcome!</p> &nbsp;
            {getFirstName(user.displayName)}
          </Header>
        </div>

        <Button.Group>
          <Button animated primary onClick={logout}>
            <Button.Content visible color="blue">
              Logout
            </Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>

          <Button
            animated
            secondary
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            <Button.Content visible color="blue">
              Go to dashboard
            </Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Button.Group>
      </Container>

      <Container>
        <p style={{ textAlign: "justify", fontSize: "1.5em" }}>
          The use of social networks has increased generationally, this has
          caused people born between 1995 and 2020 to not know a social or
          individual environment detached from virtual environments. This direct
          and prolonged exposure to these environments has caused several
          problems in the mental health of this generation and has decreased the
          physical interaction with other people.
        </p>

        {quotes?.length > 0 ? (
          <div className="w-100 h-100 flex flex-col justify-center align-center">
            <Header as="h2" className="align-center justify-center">
              What do &nbsp;
              <strong className="color-accent">profesionals</strong>
              &nbsp;think about this?
            </Header>
            <Card.Group itemsPerRow={3} stackable>
              {quotes.map((quote, index) => (
                <Card key={`quote-${index}`}>
                  <Card.Content>
                    <Image floated="right" alt={`quote-${index}-image`}>
                      <Icon name="user circle" size="large" />
                    </Image>
                    <Card.Header>
                      <Icon name="quote left" className="color-accent" />
                      {quote.author}
                    </Card.Header>
                    <Card.Meta>{quote.role}</Card.Meta>
                    <Card.Description>{quote.message}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </div>
        ) : (
          <div className="flex flex-row justify-center align-center w-100 h-100">
            <Audio color="blue" />
          </div>
        )}

        <div style={{ margin: "3em 0" }}>
          <Header as="h2" className="flex flex-row justify-center align-center">
            Some interesting &nbsp;
            <strong className="color-accent">statistics</strong>
          </Header>
          <Statistic.Group
            widths="two"
            size="small"
            style={{ marginTop: "3em" }}
          >
            <Statistic>
              <Statistic.Value>4700 M</Statistic.Value>
              <Statistic.Label>People using social networks</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>59%</Statistic.Value>
              <Statistic.Label>Of world population</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>1.75h</Statistic.Value>
              <Statistic.Label>Global usage average</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>3h</Statistic.Value>
              <Statistic.Label>GenZ average</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </div>

        <Message style={{ fontSize: "1.2em" }}>
          <Message.Header>Are There negative effects?</Message.Header>
          <Message.Content>
            We have found that social media increases:
          </Message.Content>
          <Message.List>
            <Message.Item>Depression</Message.Item>
            <Message.Item>Loneliness</Message.Item>
            <Message.Item>Anxiety</Message.Item>
            <Message.Item>Major depressive episodes</Message.Item>
            <Message.Item>Increase in suicide rates</Message.Item>
          </Message.List>
        </Message>

        <Message style={{ fontSize: "1.2em" }}>
          <Message.Header>Want to learn more?</Message.Header>
          <Message.Content>
            You can find the full paper &nbsp;
            <a
              href="https://docs.google.com/document/d/1Tm-N8-Aqy_57JAQgliLKvk6RGz8Mu7yA/edit?usp=share_link&ouid=111797125799237404278&rtpof=true&sd=true"
              target="_blank"
              rel="noreferrer"
            >
              here.
            </a>
          </Message.Content>
        </Message>
      </Container>
    </>
  );
};

export default Home;
