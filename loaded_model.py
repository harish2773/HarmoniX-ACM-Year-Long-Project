import pickle
with open('sentiment_analysis_model.pkl', 'rb') as f:
    loaded_model = pickle.load(f)
pred=loaded_model.classify_text('i love you')
print(pred.label)