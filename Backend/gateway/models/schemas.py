from pydantic import BaseModel


class SignupSchema(BaseModel):
    fullname: str
    email: str
    password: str


class SigninSchema(BaseModel):
    username: str
    password: str


class UserSchema(BaseModel):
    fullname: str
    email: str
    password: str
    role: int
    status: int


from pydantic import BaseModel
from typing import List, Optional

class WorkflowSchema(BaseModel):
    workflowId : int
    leaveType: str
    fromDate: str
    toDate: str
    reason: str

    submittedBy: str
    submittedByRole: str   # required (from mongoose schema)

    status: Optional[str] = "PENDING"
    pendingWithRoles: Optional[List[str]] = []


class ApprovalSchema(BaseModel):
    approvalId: int
    workflowId: int
    employeeName: str
    leaveType: str
    fromDate: str
    toDate: str
    approvalLevel: int
    status: str = "PENDING "


class ReviewSchema(BaseModel):
    workflowId: int
    employeeName: str
    reviewer: str
    role: str
    decision: str
    comments: str = ""


class WorkflowLogSchema(BaseModel):
    workflowId: int
    action: str
    performedBy: str
    role: str
    comments: str = ""