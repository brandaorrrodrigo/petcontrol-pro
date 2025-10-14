'use client'
import React, { useState, useEffect } from 'react';
import { PawPrint, Plus, Trash2, Calendar } from 'lucide-react';

export default function PetControlApp() {
  const [pets, setPets] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [newPet, setNewPet] = useState({ name: '', species: 'dog', breed: '', age: '', weight: '' });

  const speciesEmojis = {
    dog: '🐕', cat: '🐱', bird: '🦜', rabbit: '🐰', 
    hamster: '🐹', fish: '🐠', reptile: '🦎', other: '🐾'
  };

  useEffect(() => {
    const saved = localStorage.getItem('pets');
    if (saved) setPets(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (pets.length > 0) localStorage.setItem('pets', JSON.stringify(pets));
  }, [pets]);

  const showNotif = (msg, type = 'success') => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addPet = () => {
    if (!newPet.name || !newPet.weight) {
      showNotif('Preencha nome e peso!', 'error');
      return;
    }
    const pet = {
      id: Date.now(),
      ...newPet,
      photo: speciesEmojis[newPet.species],
      weight: parseFloat(newPet.weight),
      createdAt: new Date().toISOString()
    };
    setPets([...pets, pet]);
    setNewPet({ name: '', species: 'dog', breed: '', age: '', weight: '' });
    setShowAddForm(false);
    showNotif(`${pet.photo} ${pet.name} adicionado!`);
  };

  const deletePet = (id, name) => {
    if (window.confirm(`Remover ${name}?`)) {
      setPets(pets.filter(p => p.id !== id));
      showNotif(`${name} removido`, 'error');
    }
  };

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {notification && (
          <div style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 9999,
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: notification.type === 'success' ? '#10b981' : '#ef4444',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)'
          }}>
            {notification.message}
          </div>
        )}

        <div style={{
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          overflow: 'hidden'
        }}>
          
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '3rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '1rem',
                borderRadius: '16px'
              }}>
                <PawPrint size={40} />
              </div>
              <div>
                <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: 0 }}>
                  PetControl Pro
                </h1>
                <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '0.5rem 0 0 0' }}>
                  Controle veterinário inteligente com IA
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '1rem',
                borderRadius: '12px',
                minWidth: '120px'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{pets.length}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Pets cadastrados</div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '1rem',
                borderRadius: '12px',
                minWidth: '120px'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>✨</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Versão Beta</div>
              </div>
            </div>
          </div>

          <div style={{ padding: '3rem' }}>
            
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                width: '100%',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '2rem',
                boxShadow: '0 10px 15px -3px rgba(102,126,234,0.4)',
                transition: 'all 0.3s'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Plus size={24} />
              Adicionar Novo Pet
            </button>

            {pets.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  width: '120px',
                  height: '120px',
                  borderRadius: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 2rem'
                }}>
                  <PawPrint size={60} color="white" />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                  Nenhum pet cadastrado ainda
                </h3>
                <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                  Adicione seu primeiro amiguinho e comece a cuidar melhor dele! 🐾
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {pets.map(pet => (
                  <div
                    key={pet.id}
                    style={{
                      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
                      padding: '1.5rem',
                      borderRadius: '16px',
                      border: '2px solid #c7d2fe',
                      transition: 'all 0.3s',
                      position: 'relative'
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.2)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      color: '#4b5563'
                    }}>
                      {pet.species}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '4rem' }}>{pet.photo}</div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: '900',
                          color: '#1f2937',
                          margin: '0 0 0.25rem 0'
                        }}>
                          {pet.name}
                        </h3>
                        {pet.breed && (
                          <p style={{
                            fontSize: '0.9rem',
                            color: '#6b7280',
                            fontWeight: '600',
                            margin: 0
                          }}>
                            {pet.breed}
                          </p>
                        )}
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: pet.age ? '1fr 1fr' : '1fr',
                      gap: '0.75rem',
                      marginBottom: '1rem'
                    }}>
                      {pet.age && (
                        <div style={{
                          background: 'white',
                          padding: '0.75rem',
                          borderRadius: '12px'
                        }}>
                          <div style={{ fontSize: '0.7rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                            Idade
                          </div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#7c3aed' }}>
                            {pet.age} {pet.age === '1' ? 'ano' : 'anos'}
                          </div>
                        </div>
                      )}
                      <div style={{
                        background: 'white',
                        padding: '0.75rem',
                        borderRadius: '12px'
                      }}>
                        <div style={{ fontSize: '0.7rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                          Peso
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2563eb' }}>
                          {pet.weight}kg
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.7rem',
                      color: '#9ca3af',
                      marginBottom: '1rem'
                    }}>
                      <Calendar size={12} />
                      <span>Cadastrado em {new Date(pet.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>

                    <button
                      onClick={() => deletePet(pet.id, pet.name)}
                      style={{
                        width: '100%',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s'
                      }}
                      onMouseOver={e => e.currentTarget.style.background = '#dc2626'}
                      onMouseOut={e => e.currentTarget.style.background = '#ef4444'}
                    >
                      <Trash2 size={16} />
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}

            {showAddForm && (
              <div style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                zIndex: 999
              }}>
                <div style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '2rem',
                  maxWidth: '500px',
                  width: '100%',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      padding: '0.75rem',
                      borderRadius: '12px'
                    }}>
                      <PawPrint color="white" size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0 }}>
                      Adicionar Pet
                    </h3>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                      }}>
                        Nome do Pet *
                      </label>
                      <input
                        type="text"
                        value={newPet.name}
                        onChange={(e) => setNewPet({...newPet, name: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          boxSizing: 'border-box'
                        }}
                        placeholder="Ex: Rex, Mia, Bob..."
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                      }}>
                        Espécie *
                      </label>
                      <select
                        value={newPet.species}
                        onChange={(e) => setNewPet({...newPet, species: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="dog">🐕 Cachorro</option>
                        <option value="cat">🐱 Gato</option>
                        <option value="bird">🦜 Pássaro</option>
                        <option value="rabbit">🐰 Coelho</option>
                        <option value="hamster">🐹 Hamster</option>
                        <option value="fish">🐠 Peixe</option>
                        <option value="reptile">🦎 Réptil</option>
                        <option value="other">🐾 Outro</option>
                      </select>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                      }}>
                        Raça
                      </label>
                      <input
                        type="text"
                        value={newPet.breed}
                        onChange={(e) => setNewPet({...newPet, breed: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          boxSizing: 'border-box'
                        }}
                        placeholder="Ex: Labrador, SRD, Persa..."
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          marginBottom: '0.5rem'
                        }}>
                          Idade (anos)
                        </label>
                        <input
                          type="number"
                          value={newPet.age}
                          onChange={(e) => setNewPet({...newPet, age: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                          }}
                          placeholder="5"
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          marginBottom: '0.5rem'
                        }}>
                          Peso (kg) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={newPet.weight}
                          onChange={(e) => setNewPet({...newPet, weight: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                          }}
                          placeholder="25.5"
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                      <button
                        onClick={addPet}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '1rem',
                          borderRadius: '12px',
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          cursor: 'pointer'
                        }}
                      >
                        Adicionar
                      </button>
                      <button
                        onClick={() => {
                          setShowAddForm(false);
                          setNewPet({ name: '', species: 'dog', breed: '', age: '', weight: '' });
                        }}
                        style={{
                          padding: '1rem 1.5rem',
                          background: '#e5e7eb',
                          color: '#374151',
                          border: 'none',
                          borderRadius: '12px',
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          cursor: 'pointer'
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '50px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)'
          }}>
            <PawPrint size={20} color="#7c3aed" />
            <span style={{ fontWeight: 'bold' }}>PetControl Pro</span>
            <span style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '50px',
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}>
              BETA
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>
            Sistema completo de controle veterinário • Versão Beta 1.0
          </p>
        </div>
      </div>
    </div>
  );
}