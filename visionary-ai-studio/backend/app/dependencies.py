from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from . import auth, models
from .database import get_db

bearer_scheme = HTTPBearer(auto_error=False)


# Reads the "Authorization: Bearer <token>" header, checks it, and returns the matching user.
def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> models.User:
    unauthorized = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated.")

    if credentials is None:
        raise unauthorized

    user_id = auth.decode_access_token(credentials.credentials)
    if user_id is None:
        raise unauthorized

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise unauthorized

    return user