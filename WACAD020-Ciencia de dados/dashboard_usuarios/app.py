import streamlit as st
import pandas as pd
import plotly.express as px # Adicione plotly.express aqui para uso futuro

# Carregar o dataset
try:
    df = pd.read_csv('usuarios_limpo.csv')
    df['data_cadastro'] = pd.to_datetime(df['data_cadastro'])
except FileNotFoundError:
    st.error("Arquivo 'usuarios_limpo.csv' não encontrado. Por favor, execute a célula de geração de dados sintéticos e salve o arquivo.")
    st.stop() # Parar a execução do Streamlit se o arquivo não for encontrado

# Adicionar um título com st.title()
st.title("Dashboard de Análise de Usuários")

# Adicionar um texto de introdução com st.write() ou st.markdown()
st.markdown("""
Este dashboard interativo permite explorar o perfil dos nossos usuários,
sua distribuição geográfica e a evolução dos cadastros ao longo do tempo.
Utilize os filtros na barra lateral para análises mais detalhadas.
""")