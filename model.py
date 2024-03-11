import pickle
from happytransformer import HappyTextClassification


happy_model=HappyTextClassification(model_type='Distilbert',model_name='bhadresh-savani/distilbert-base-uncased-emotion',num_labels=6)
text="man these exams are killing me"
pred=happy_model.classify_text(text)

with open('sentiment_analysis_model.pkl', 'wb') as f:
    pickle.dump(happy_model, f)