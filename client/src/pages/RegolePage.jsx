import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import "bootstrap-icons/font/bootstrap-icons.css";

function RegolePage ()  {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('objective');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const primaryGradient = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  const secondaryGradient = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
  const successGradient = "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";

  const floatingAnimation = {
    animation: "float 6s ease-in-out infinite"
  };

  const pulseAnimation = {
    animation: "pulse 2s infinite"
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        .fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .bounce-in { animation: bounceIn 1s ease-out; }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }
        body { 
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          min-height: 100vh;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }
        .floating-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }
        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 8s infinite ease-in-out;
        }
      `}</style>

      {/* Floating Particles Background */}
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 4 + 6}s`
            }}
          />
        ))}
      </div>

      <div style={{ background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", minHeight: "100vh", color: "white" }}>
        {/* Hero Section */}
        <Container fluid className="text-center py-5">
          <div className={`${isVisible ? 'fade-in-up' : ''}`}>
            <div 
              className="d-inline-flex align-items-center justify-content-center mb-4 rounded-circle bounce-in"
              style={{ 
                width: 120, 
                height: 120, 
                background: primaryGradient,
                ...floatingAnimation
              }}
            >
              <i className="bi bi-lightning-charge" style={{ fontSize: "3rem", color: "white" }}></i>
            </div>
            
            <h1 
              className="display-1 fw-black mb-4 shimmer"
              style={{ 
                background: "linear-gradient(135deg, #fff 0%, #f0f8ff 50%, #fff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: "4.5rem",
                letterSpacing: "2px"
              }}
            >
              REGOLE DEL GIOCO
            </h1>
            
            <p className="lead fs-3 mb-5" style={{ color: "#e6f3ff", maxWidth: "800px", margin: "0 auto" }}>
              Metti alla prova il tuo <span style={{ color: "#ffd700", fontWeight: "bold" }}>intuito</span> e colloca le situazioni più terribili sulla scala della <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>sfortuna</span>!
            </p>

            <Button
              size="lg"
              className="px-5 py-3 rounded-pill fw-bold hover-lift"
              style={{ 
                background: "rgba(255, 255, 255, 0.1)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                color: "white",
                fontSize: "1.2rem"
              }}
              onClick={() => navigate("/")}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Torna alla Home
            </Button>
          </div>
        </Container>

        {/* Navigation Pills */}
        <Container className="mb-5">
          <Nav variant="pills" className="justify-content-center">
            <div className="glass-card rounded-pill p-2">
              {[
                { key: 'objective', icon: 'trophy', label: 'Obiettivo' },
                { key: 'gameplay', icon: 'play-circle', label: 'Come Giocare' },
                { key: 'example', icon: 'lightbulb', label: 'Esempio' },
                { key: 'victory', icon: 'target', label: 'Vittoria/Sconfitta' }
              ].map((item) => (
                <Nav.Item key={item.key} className="mx-1">
                  <Nav.Link
                    active={activeSection === item.key}
                    onClick={() => setActiveSection(item.key)}
                    className="rounded-pill px-4 py-2 fw-bold text-white hover-lift"
                    style={{
                      background: activeSection === item.key ? primaryGradient : "transparent",
                      border: "none",
                      transition: "all 0.3s ease"
                    }}
                  >
                    <i className={`bi bi-${item.icon} me-2`}></i>
                    {item.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </div>
          </Nav>
        </Container>

        {/* Content Sections */}
        <Container className="pb-5">
          {/* Obiettivo */}
          {activeSection === 'objective' && (
            <div className="fade-in-up">
              <Card className="glass-card border-0 text-white hover-lift" style={{ borderRadius: "2rem" }}>
                <Card.Body className="p-5 text-center">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                    style={{ 
                      width: 100, 
                      height: 100, 
                      background: successGradient,
                      ...pulseAnimation
                    }}
                  >
                    <i className="bi bi-trophy" style={{ fontSize: "2.5rem", color: "white" }}></i>
                  </div>
                  
                  <h2 className="display-4 fw-bold mb-4" style={{ color: "#4facfe" }}>OBIETTIVO</h2>
                  
                  <div 
                    className="glass-card rounded-4 p-4 mx-auto"
                    style={{ maxWidth: "600px", background: "rgba(79, 172, 254, 0.1)" }}
                  >
                    <div className="d-flex align-items-center justify-content-center mb-3">
                      <span className="fs-2 me-3">Raccogli</span>
                      <div 
                        className="d-inline-flex align-items-center justify-content-center rounded-circle fw-black fs-1"
                        style={{ 
                          width: 80, 
                          height: 80, 
                          background: successGradient,
                          color: "white",
                          ...pulseAnimation
                        }}
                      >
                        6
                      </div>
                      <span className="fs-2 ms-3">carte</span>
                    </div>
                    <p className="fs-5 mb-0" style={{ color: "#e6f3ff" }}>
                      Indovina correttamente dove collocare le nuove situazioni orribili tra quelle che già possiedi, in base al loro <span style={{ color: "#ffd700", fontWeight: "bold" }}>indice di sfortuna</span>!
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}

          {/* Come Giocare */}
          {activeSection === 'gameplay' && (
            <div className="fade-in-up">
              <div className="text-center mb-5">
                <div 
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                  style={{ 
                    width: 100, 
                    height: 100, 
                    background: primaryGradient,
                    ...floatingAnimation
                  }}
                >
                  <i className="bi bi-play-circle" style={{ fontSize: "2.5rem", color: "white" }}></i>
                </div>
                <h2 className="display-4 fw-bold gradient-text">COME GIOCARE</h2>
              </div>

              <Row className="g-4">
                {[
                  {
                    step: "1",
                    title: "Ricevi 3 Carte Iniziali",
                    desc: "Ogni carta mostra nome, immagine e indice di sfortuna (1-100)",
                    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    icon: "collection"
                  },
                  {
                    step: "2",
                    title: "Nuova Situazione",
                    desc: "Ti viene mostrata una carta SENZA l'indice di sfortuna",
                    gradient: primaryGradient,
                    icon: "question-circle"
                  },
                  {
                    step: "3",
                    title: "Indovina la Posizione",
                    desc: "Decidi dove collocarla tra le tue carte esistenti",
                    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                    icon: "bullseye"
                  },
                  {
                    step: "4",
                    title: "Risultato",
                    desc: "Hai 30 secondi! Indovini = ottieni la carta",
                    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                    icon: "clock"
                  }
                ].map((item, index) => (
                  <Col md={6} key={index}>
                    <Card 
                      className="glass-card border-0 text-white h-100 hover-lift"
                      style={{ borderRadius: "1.5rem", animationDelay: `${index * 0.2}s` }}
                    >
                      <Card.Body className="p-4">
                        <div 
                          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 fw-black fs-3"
                          style={{ 
                            width: 60, 
                            height: 60, 
                            background: item.gradient,
                            color: "white"
                          }}
                        >
                          {item.step}
                        </div>
                        <h4 className="fw-bold mb-3">{item.title}</h4>
                        <p className="mb-0" style={{ color: "#e6f3ff" }}>{item.desc}</p>
                        <i className={`bi bi-${item.icon} position-absolute`} 
                           style={{ 
                             top: "1rem", 
                             right: "1rem", 
                             fontSize: "1.5rem", 
                             opacity: 0.3 
                           }}></i>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Esempio */}
          {activeSection === 'example' && (
            <div className="fade-in-up">
              <div className="text-center mb-5">
                <div 
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                  style={{ 
                    width: 100, 
                    height: 100, 
                    background: "linear-gradient(135deg, #ffd700 0%, #ffb347 100%)",
                    ...pulseAnimation
                  }}
                >
                  <i className="bi bi-lightbulb" style={{ fontSize: "2.5rem", color: "white" }}></i>
                </div>
                <h2 className="display-4 fw-bold" style={{ color: "#ffd700" }}>ESEMPIO PRATICO</h2>
              </div>

              <Row className="mb-4">
                <Col>
                  <Card className="glass-card border-0 text-white hover-lift" style={{ borderRadius: "1.5rem" }}>
                    <Card.Body className="p-4">
                      <h4 className="text-center mb-4" style={{ color: "#ffd700" }}>
                        <i className="bi bi-collection me-2"></i>
                        Le tue carte attuali:
                      </h4>
                      <Row className="justify-content-center g-3">
                        {[
                          { text: "Ti cade il gelato", value: "1.5", bg: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)" },
                          { text: "Perdi il portafoglio", value: "42.5", bg: "linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)" },
                          { text: "Ti lascia il fidanzato", value: "99", bg: "linear-gradient(135deg, #ef5350 0%, #e53935 100%)" }
                        ].map((card, index) => (
                          <Col md={4} key={index}>
                            <div 
                              className="glass-card rounded-3 p-3 text-center text-white hover-lift"
                              style={{ 
                                background: card.bg,
                                minHeight: "120px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                ...floatingAnimation,
                                animationDelay: `${index}s`
                              }}
                            >
                              <div className="fw-bold mb-2">{card.text}</div>
                              <div className="display-6 fw-black">{card.value}</div>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <div className="text-center mb-4">
                <i className="bi bi-arrow-down" style={{ fontSize: "2rem", color: "#ffd700", ...pulseAnimation }}></i>
              </div>

              <Row>
                <Col>
                  <Card className="glass-card border-0 text-white hover-lift" style={{ borderRadius: "1.5rem" }}>
                    <Card.Body className="p-4 text-center">
                      <h4 className="mb-4" style={{ color: "#ff6b6b" }}>
                        <i className="bi bi-question-circle me-2"></i>
                        Nuova situazione da collocare:
                      </h4>
                      <div 
                        className="d-inline-block glass-card rounded-3 p-4 text-white"
                        style={{ 
                          background: secondaryGradient,
                          ...pulseAnimation
                        }}
                      >
                        <div className="fw-bold fs-4 mb-2">Ti si rompe lo smartphone</div>
                        <div className="display-5 fw-black" style={{ color: "#ffd700" }}>???</div>
                      </div>
                      <div className="mt-4">
                        <Badge 
                          className="fs-6 px-4 py-2"
                          style={{ 
                            background: "rgba(255, 215, 0, 0.2)", 
                            color: "#ffd700",
                            border: "1px solid #ffd700"
                          }}
                        >
                          💡 Dove la collocheresti? Probabilmente tra "Perdi il portafoglio" e "Ti lascia il fidanzato"!
                        </Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}

          {/* Vittoria/Sconfitta */}
          {activeSection === 'victory' && (
            <div className="fade-in-up">
              <div className="text-center mb-5">
                <div 
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                  style={{ 
                    width: 100, 
                    height: 100, 
                    background: "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
                    ...floatingAnimation
                  }}
                >
                  <i className="bi bi-target" style={{ fontSize: "2.5rem", color: "white" }}></i>
                </div>
                <h2 className="display-4 fw-bold" style={{ 
                  background: "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>VITTORIA & SCONFITTA</h2>
              </div>

              <Row className="g-4 mb-5">
                <Col md={6}>
                  <Card className="glass-card border-0 text-white h-100 text-center hover-lift" style={{ borderRadius: "2rem" }}>
                    <Card.Body className="p-5">
                      <div 
                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                        style={{ 
                          width: 100, 
                          height: 100, 
                          background: successGradient,
                          ...bounceAnimation
                        }}
                      >
                        <i className="bi bi-trophy" style={{ fontSize: "2.5rem", color: "white" }}></i>
                      </div>
                      <h3 className="display-5 fw-bold mb-3" style={{ color: "#4facfe" }}>VITTORIA</h3>
                      <div className="display-2 fw-black mb-3">6 CARTE</div>
                      <p className="fs-5" style={{ color: "#e6f3ff" }}>
                        Raccogli 6 carte in totale e diventa il maestro della sfortuna!
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="glass-card border-0 text-white h-100 text-center hover-lift" style={{ borderRadius: "2rem" }}>
                    <Card.Body className="p-5">
                      <div 
                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                        style={{ 
                          width: 100, 
                          height: 100, 
                          background: secondaryGradient,
                          ...pulseAnimation
                        }}
                      >
                        <span style={{ fontSize: "2.5rem" }}>💀</span>
                      </div>
                      <h3 className="display-5 fw-bold mb-3" style={{ color: "#f093fb" }}>SCONFITTA</h3>
                      <div className="display-2 fw-black mb-3">3 ERRORI</div>
                      <p className="fs-5" style={{ color: "#e6f3ff" }}>
                        Tre errori e la partita finisce. Ritenta per migliorare!
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card className="glass-card border-0 text-white hover-lift" style={{ borderRadius: "1.5rem" }}>
                <Card.Body className="p-4 text-center">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <i className="bi bi-clock" style={{ fontSize: "2.5rem", color: "#ffd700", ...pulseAnimation }}></i>
                    <h3 className="ms-3 mb-0 display-6 fw-bold" style={{ color: "#ffd700" }}>30 SECONDI PER ROUND</h3>
                  </div>
                  <p className="fs-5 mb-0" style={{ color: "#e6f3ff" }}>
                    💡 <span className="fw-bold">Consiglio:</span> Studia bene le tue carte prima di ogni round!
                  </p>
                </Card.Body>
              </Card>
            </div>
          )}
        </Container>

        {/* Action Buttons */}
        <Container className="text-center pb-5">
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
                <Button
                  size="lg"
                  className="px-5 py-3 rounded-pill fw-bold hover-lift"
                  style={{ 
                    background: primaryGradient,
                    border: "none",
                    fontSize: "1.3rem",
                    minWidth: "250px"
                  }}
                  onClick={() => navigate("/login")}
                >
                  <i className="bi bi-star-fill me-2" style={{...pulseAnimation}}></i>
                  Inizia Partita Completa
                </Button>
                <Button
                  size="lg"
                  variant="outline-light"
                  className="px-5 py-3 rounded-pill fw-bold hover-lift"
                  style={{ 
                    fontSize: "1.3rem",
                    minWidth: "250px",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)"
                  }}
                  onClick={() => navigate("/demo")}
                >
                  <i className="bi bi-clock me-2"></i>
                  Prova Demo (1 Round)
                </Button>
              </div>
              <p style={{ color: "#b3d9ff" }}>
                ✨ Gli utenti anonimi possono giocare solo la demo di un round
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default RegolePage;