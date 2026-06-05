import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignatureMasterpiece.css';

const SignatureMasterpiece = () => {
    const navigate = useNavigate();

    return (
        <section className="signature-masterpiece section">
            <div className="container">
                <div className="masterpiece-grid">
                    <div className="masterpiece-image reveal-scale">
                        <img src="/images/sambhaji maharaj standing/1.jpeg" alt="Chhatrapati Sambhaji Maharaj Standing" />
                    </div>
                    <div className="masterpiece-content">
                        <span className="masterpiece-badge reveal-up">Signature Collection</span>
                        <h2 className="reveal-up" style={{ animationDelay: '0.2s' }}>Chhatrapati Sambhaji Maharaj</h2>
                        <p className="masterpiece-desc reveal-up" style={{ animationDelay: '0.4s' }}>
                            A breathtaking exhibition-grade sculpture capturing the indomitable spirit of Chhatrapati Sambhaji Maharaj. Featuring an antique bronze finish and exquisite detailing.
                        </p>
                        <div className="reveal-up" style={{ animationDelay: '0.6s' }}>
                            <button 
                                className="btn btn-premium"
                                onClick={() => navigate('/product/sambhaji-maharaj-standing')}
                            >
                                View Masterpiece
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignatureMasterpiece;
